module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/orders/create-payment',
      handler: 'order.createOrder',
    },
    {
      method: 'GET',
      path: '/orders/get-payment/:token',
      handler: 'order.getOrder',
    },
  ],
};
