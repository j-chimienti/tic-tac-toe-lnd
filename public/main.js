'use strict';
(function () {
    const socket = io();
    const display = document.querySelector('#display');
    const orderId = document.querySelector('#orderId');
    const status = document.querySelector('#status');

    const {value} = orderId;
    socket.emit('INIT_ORDER', value);

    socket.on('ORDER_SUCCESS', result => {
        display.innerText = JSON.stringify(result);
        status.value = result.status;
        status.classList.add('text-success');
    });

    function getInvoice() {
        socket.emit('GET_INVOICE_DATA', orderId.value);

    }

    socket.on('INVOICE_DATA', result => {

        display.innerText = JSON.stringify(result);
        status.value = result.status;
        status.classList.add(result.status === 'paid' ? 'text-success' : 'text-info');
    });


    setInterval(() => getInvoice(), 1000 * 10);
    getInvoice();


})();
