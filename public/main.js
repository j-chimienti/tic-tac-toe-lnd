'use strict';
(function () {
    const socket = io();
    const display = document.querySelector('#display');
    const orderId = document.querySelector('#orderId');
    const status = document.querySelector('#status');

    const {value} = orderId;
    socket.emit('initOrder', value);

    socket.on('orderSuccess', result => {
        display.innerText = JSON.stringify(result);
        status.value = 'completed';
        status.classList.add('text-success');
    });


})();
