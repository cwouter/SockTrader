import {EventEmitter} from "events";
import WSWebSocket from "ws";
import logger from "../loggerFactory";
import {Command, Connection} from "../types/connection";

export type Data = WSWebSocket.Data;

export default class WsConnection extends EventEmitter implements Connection {

    private readonly latency = 1000;
    private readonly waitForPong = 2000;
    private readonly restoreCommands: Command[] = [];
    private pingTimeout?: NodeJS.Timeout;
    private resetTimeout?: NodeJS.Timeout;
    private connection?: WSWebSocket;
    private isReconnecting = false;
    private isExpectingPong = false;

    constructor(private readonly connectionString: string, private readonly timeout: number) {
        super();
    }

    /**
     * The connection will be closed automatically if the server is unable to reply
     * within a predefined amount of time.
     */
    private heartbeat() {
        const timeout = this.timeout + this.latency;

        if (this.pingTimeout) global.clearTimeout(this.pingTimeout);
        if (this.resetTimeout) global.clearTimeout(this.resetTimeout);

        this.pingTimeout = setTimeout(() => {
            logger.info(`No response received from exchange within ${timeout / 1000}s.`);

            if (this.connection) this.connection.ping("is_target_online");
            this.isExpectingPong = true;
            this.waitForTermination();
        }, timeout);
    }

    private waitForTermination(): void {
        this.resetTimeout = setTimeout(() => {
            if (this.connection) this.connection.terminate();
        }, this.waitForPong);
    }

    /**
     * Prevent memory leak by removing all event listeners and clear timeout
     */
    private cleanUp() {
        if (this.connection) this.connection.removeAllListeners();
        if (this.pingTimeout) global.clearTimeout(this.pingTimeout);
        if (this.resetTimeout) global.clearTimeout(this.resetTimeout);
    }

    private reconnect() {
        this.isReconnecting = true;
        global.setTimeout(() => this.connect(), 10 * 1000);
    }

    private onClose(code: number, reason: string) {
        logger.info(`Connection closed: ${code} ${reason}`);
        this.cleanUp();
        this.reconnect();
    }

    private onError(error: Error) {
        logger.error(`WebSocket error: ${error.message}`);
    }

    private onMessage(data: WSWebSocket.Data) {
        this.emit("message", data);
        this.heartbeat();
    }

    private onOpen() {
        logger.info("Connection established!");
        this.emit("open");

        // Restore state as before the connection was closed
        if (this.isReconnecting) this.restoreCommands.forEach(command => this.send(command));
        this.isReconnecting = false;

        this.heartbeat();
    }

    private onPing() {
        this.heartbeat();
    }

    private onPong() {
        if (this.isExpectingPong) this.heartbeat();
        this.isExpectingPong = false;
    }

    addRestorable(command: Command) {
        this.restoreCommands.push(command);
    }

    send(command: Command) {
        try {
            if (!this.connection) {
                logger.error(`Could not send: ${JSON.stringify(command)}. No connection available.`);
                return;
            }

            if (command.restorable) this.addRestorable(command);
            this.connection.send(JSON.stringify(command.toCommand()));
        } catch (e) {
            logger.error(e);
        }
    }

    connect(): void {
        this.connection = new WSWebSocket(this.connectionString, {perMessageDeflate: false});

        this.connection.on("close", (code, reason): void => this.onClose(code, reason));
        this.connection.on("open", () => this.onOpen());
        this.connection.on("ping", () => this.onPing());
        this.connection.on("pong", () => this.onPong());
        this.connection.on("error", error => this.onError(error));
        this.connection.on("message", data => this.onMessage(data));
        this.connection.on("unexpected-response", () => logger.info("Unexpected response"));
    }
}
