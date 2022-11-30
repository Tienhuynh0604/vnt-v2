module.exports = {
  paymentGateway: {
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
    ]
  },
  settings: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/',
        handler: 'paymentVnsController.getSettings',
        config: {
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/',
        handler: 'paymentVnsController.setSettings',
        config: {
          policies: [],
        },
      },
    ]
  }
};
