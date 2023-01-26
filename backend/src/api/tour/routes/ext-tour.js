module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/tours/payment-product/:id',
      handler: 'tour.getPaymentProductAction',
    },
    {
      method: 'GET',
      path: '/tours/places/:id',
      handler: 'tour.getPlacesAction',
    },
  ],
};
