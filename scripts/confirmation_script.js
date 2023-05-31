window.addEventListener('load', function () {
    var order_id = JSON.parse(sessionStorage.getItem('order_id'));
    var orderNumber = document.getElementById('order_number');
    orderNumber.innerHTML = order_id;
});
