"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order = /** @class */ (function () {
    function Order(_a) {
        var id = _a.id, userId = _a.userId, expirationTime = _a.expirationTime, invoiceTime = _a.invoiceTime, currentTime = _a.currentTime;
        this.id = id;
        this.userId = userId;
        this.expirationTime = new Date(expirationTime);
        this.invoiceTime = new Date(invoiceTime);
        this.currentTime = new Date(currentTime);
    }
    return Order;
}());
exports.Order = Order;
