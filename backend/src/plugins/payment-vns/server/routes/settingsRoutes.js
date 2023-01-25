module.exports = {
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
};
