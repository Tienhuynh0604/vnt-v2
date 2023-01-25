module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/tours/payment-product/:id',
      handler: 'tour.getPaymentProductAction',
    },
  ],
};
