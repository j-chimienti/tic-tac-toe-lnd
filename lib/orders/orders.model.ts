export class Order implements IOrder {

    public id;
    public userId;
    public expirationTime;
    public invoiceTime;
    public currentTime;
    public url;
    public posData;
    public status;
    public btcPrice;
    public price;
    public currency;
    public btcPaid;
    public btcDue;
    public rate;
    public exceptionStatus;
    public buyerFields;
    public transactionCurrency;
    public paymentSubtotals;
    public paymentTotals;
    public amountPaid;
    public exchangeRates;

    constructor({
                    id,
                    userId,
                    expirationTime,
                    invoiceTime,
                    currentTime,
                    url,
                    posData,
                    status,
                    btcPrice,
                    price,
                    currency,
                    btcPaid,
                    btcDue,
                    rate,
                    exceptionStatus,
                    buyerFields,
                    transactionCurrency,
                    paymentSubtotals,
                    paymentTotals,
                    amountPaid,
                    exchangeRates,
                }) {
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
}


interface PaymentSubtotals {
    BTC_LightningLike: number;
}

interface PaymentTotals {
    BTC_LightningLike: number;
}

interface BTC {
    BTC: number;
}

interface ExchangeRates {
    BTC: BTC;
}

interface IOrder {
    id: string;
    url?: any;
    posData?: any;
    status: string;
    btcPrice?: any;
    price: number;
    currency: string;
    invoiceTime: Date;
    expirationTime: Date;
    currentTime: Date;
    btcPaid?: any;
    btcDue?: any;
    rate: number;
    exceptionStatus: boolean;
    buyerFields?: any;
    transactionCurrency?: any;
    paymentSubtotals: PaymentSubtotals;
    paymentTotals: PaymentTotals;
    amountPaid: string;
    exchangeRates: ExchangeRates;
    userId: string;
}



