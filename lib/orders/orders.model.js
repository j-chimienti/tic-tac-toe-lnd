"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order = /** @class */ (function () {
    function Order(_a) {
        var id = _a.id, userId = _a.userId, expirationTime = _a.expirationTime, invoiceTime = _a.invoiceTime, currentTime = _a.currentTime, url = _a.url, posData = _a.posData, status = _a.status, btcPrice = _a.btcPrice, price = _a.price, currency = _a.currency, btcPaid = _a.btcPaid, btcDue = _a.btcDue, rate = _a.rate, exceptionStatus = _a.exceptionStatus, buyerFields = _a.buyerFields, transactionCurrency = _a.transactionCurrency, paymentSubtotals = _a.paymentSubtotals, paymentTotals = _a.paymentTotals, amountPaid = _a.amountPaid, exchangeRates = _a.exchangeRates;
        this.id = id;
        this.userId = userId;
        this.expirationTime = new Date(expirationTime);
        this.invoiceTime = new Date(invoiceTime);
        this.currentTime = new Date(currentTime);
        this.url = url;
        this.posData = posData;
        this.status = status;
        this.btcPrice = btcPrice;
        this.price = price;
        this.currency = currency;
        this.invoiceTime = invoiceTime;
        this.expirationTime = expirationTime;
        this.currentTime = currentTime;
        this.btcPaid = btcPaid;
        this.btcDue = btcDue;
        this.rate = rate;
        this.exceptionStatus = exceptionStatus;
        this.buyerFields = buyerFields;
        this.transactionCurrency = transactionCurrency;
        this.paymentSubtotals = paymentSubtotals;
        this.paymentTotals = paymentTotals;
        this.amountPaid = amountPaid;
        this.exchangeRates = exchangeRates;
        this.userId = userId;
    }
    return Order;
}());
exports.Order = Order;
