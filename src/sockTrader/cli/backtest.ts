import config from "../../config";
import BackTester from "../core/bot/backTester";
import IPC from "../core/plugins/reporter/IPC";
import {loadCandleFile, loadStrategy} from "./util";
import {CandleFile} from "../core/types/candle";

export default class Backtest {
    constructor(private candleFile: string, private strategyFile: string) {
    }

    createBackTester(candleFile: CandleFile, strategy: any) {
        return new BackTester(candleFile)
            .setPlugins([...config.plugins, new IPC()])
            .setStrategy({
                strategy,
                pair: candleFile.symbol,
            });
    }

    async start() {
        try {
            process.env.SOCKTRADER_TRADING_MODE = "BACKTEST";

            const {default: strategy} = await loadStrategy(this.strategyFile);
            const {default: candleFile} = await loadCandleFile(this.candleFile);

            const backTester = this.createBackTester(candleFile, strategy);
            await backTester.start();
        } catch (e) {
            console.error(e);
        }
    }
}
