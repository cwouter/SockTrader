import moment = require("moment");
import {Order, OrderSide, OrderStatus, OrderTimeInForce, OrderType, ReportType} from "../sockTrader/core/types/order";

export const FX_FILLED_BUY_ORDER: Order = {
    createdAt: moment().subtract(4, "minutes"),
    side: OrderSide.BUY,
    status: OrderStatus.FILLED,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.TRADE,
    id: "NEW_BUY_ORDER_1",
    pair: ["BTC", "USD"],
    price: 100,
    quantity: 1,
};

export const FX_FILLED_SELL_ORDER: Order = {
    createdAt: moment().subtract(4, "minutes"),
    side: OrderSide.SELL,
    status: OrderStatus.FILLED,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.TRADE,
    id: "NEW_SELL_ORDER_1",
    pair: ["BTC", "USD"],
    price: 100,
    quantity: 1,
};

export const FX_NEW_BUY_ORDER: Order = {
    createdAt: moment().subtract(5, "minutes"),
    side: OrderSide.BUY,
    status: OrderStatus.NEW,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.NEW,
    id: "NEW_BUY_ORDER_1",
    pair: ["BTC", "USD"],
    price: 100,
    quantity: 1,
};

export const FX_FIXED_TIME_BUY_ORDER: Order = {
    createdAt: moment.utc("2020-01-01 17:00:00"),
    side: OrderSide.BUY,
    status: OrderStatus.NEW,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment.utc("2020-01-01 17:00:00"),
    reportType: ReportType.NEW,
    id: "NEW_BUY_ORDER_1",
    pair: ["BTC", "USD"],
    price: 100,
    quantity: 1,
};

export const FX_REPLACED_BUY_ORDER: Order = {
    createdAt: moment().subtract(5, "minutes"),
    side: OrderSide.BUY,
    status: OrderStatus.NEW,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.REPLACED,
    pair: ["BTC", "USD"],
    price: 150,
    quantity: 1,
    originalId: "NEW_BUY_ORDER_1",
    id: "NEW_BUY_ORDER_2",
};

export const FX_NEW_SELL_ORDER: Order = {
    createdAt: moment().subtract(5, "minutes"),
    side: OrderSide.SELL,
    status: OrderStatus.NEW,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.NEW,
    id: "NEW_SELL_ORDER_1",
    pair: ["BTC", "USD"],
    price: 100,
    quantity: 1,
};

export const FX_REPLACED_SELL_ORDER: Order = {
    createdAt: moment().subtract(5, "minutes"),
    side: OrderSide.SELL,
    status: OrderStatus.NEW,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.REPLACED,
    pair: ["BTC", "USD"],
    price: 200,
    quantity: 2,
    originalId: "NEW_SELL_ORDER_1",
    id: "NEW_SELL_ORDER_2",
};

export const FX_CANCELLED_BUY_ORDER: Order = {
    createdAt: moment().subtract(5, "minutes"),
    side: OrderSide.BUY,
    status: OrderStatus.NEW,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.CANCELED,
    id: "NEW_BUY_ORDER_1",
    pair: ["BTC", "USD"],
    price: 100,
    quantity: 1,
};

export const FX_CANCELLED_SELL_ORDER: Order = {
    createdAt: moment().subtract(5, "minutes"),
    side: OrderSide.SELL,
    status: OrderStatus.NEW,
    timeInForce: OrderTimeInForce.GOOD_TILL_CANCEL,
    type: OrderType.LIMIT,
    updatedAt: moment(),
    reportType: ReportType.CANCELED,
    id: "NEW_SELL_ORDER_1",
    pair: ["BTC", "USD"],
    price: 100,
    quantity: 1,
};
