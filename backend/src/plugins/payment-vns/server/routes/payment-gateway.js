module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/get-cities',
      handler: 'paymentVnsController.getCities',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/get-services',
      handler: 'paymentVnsController.getServices',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/sync-services',
      handler: 'paymentVnsController.syncServices',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/get-service/:id',
      handler: 'paymentProductController.getPaymentProductAction',
      config: {
        policies: [],
      },
    },
  ]
};
