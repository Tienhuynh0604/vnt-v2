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
        path: '/settings',
        handler: 'paymentVnsController.getSettings',
        config: {
          policies: [],
        },
      },
      {
        method: 'PUT',
        path: '/settings',
        handler: 'paymentVnsController.setSettings',
        config: {
          policies: [],
        },
      },
    ]
  }
};
