interface BaseOrder {
    id: string;
    userId: string;
}


interface IOrder extends BaseOrder {

    expirationTime: string | number;
    invoiceTime: string | number;
    currentTime: string | number;
}

interface IOrderDb extends BaseOrder {
    expirationTime: Date;
    invoiceTime: Date;
    currentTime: Date;
}

export class Order implements IOrderDb {

    public id;
    public userId;
    public expirationTime;
    public invoiceTime;
    public currentTime;

    constructor({id, userId, expirationTime, invoiceTime, currentTime}: IOrder) {
        this.id = id;
        this.userId = userId;
        this.expirationTime = new Date(expirationTime);
        this.invoiceTime = new Date(invoiceTime);
        this.currentTime = new Date(currentTime);

    }
}
