import {CandleInterval} from "../types/candleInterval";
import {OrderCreator} from "../types/orderCreator";
import BaseExchange from "./baseExchange";
import HitBTC, {HitBTCCandleInterval} from "./hitBTC";
import LocalExchange from "./localExchange";
import HitBTCOrderCreator from "./orderCreators/hitBTCOrderCreator";
import LocalOrderCreator from "./orderCreators/localOrderCreator";

export interface ExchangeDefinition {
    class: new() => BaseExchange;
    orderCreator: new(...args: any[]) => OrderCreator;
    intervals: Record<string, CandleInterval>;
}

export const exchanges: Record<string, ExchangeDefinition> = {
    local: {
        class: LocalExchange,
        orderCreator: LocalOrderCreator,
        intervals: {},
    },
    hitbtc: {
        class: HitBTC,
        orderCreator: HitBTCOrderCreator,
        intervals: {
            "1m": HitBTCCandleInterval.ONE_MINUTE,
            "3m": HitBTCCandleInterval.THREE_MINUTES,
            "5m": HitBTCCandleInterval.FIVE_MINUTES,
            "15m": HitBTCCandleInterval.FIFTEEN_MINUTES,
            "30m": HitBTCCandleInterval.THIRTY_MINUTES,
            "1h": HitBTCCandleInterval.ONE_HOUR,
            "4h": HitBTCCandleInterval.FOUR_HOURS,
            "1d": HitBTCCandleInterval.ONE_DAY,
            "7d": HitBTCCandleInterval.SEVEN_DAYS,
            "1M": HitBTCCandleInterval.ONE_MONTH,
        },
    },
};
