module.exports = ({env}) => {
  return {
    seo: {
      enabled: true,
    },
    ckeditor: {
      enabled: true,
    },
    navigation: {
      enabled: true,
    },
    'payment-vns': {
      enabled: true,
      resolve: './src/plugins/payment-vns'
    },
    "rest-cache": {
      enabled: env("CACHED_ENABLED", "false") === "true",
      config: {
        provider: {
          name: "memory",
          options: {
            max: 32767,
            maxAge: env("CACHED_MAX_AGE", 3600),
          },
        },
        strategy: {
          contentTypes: [
            // list of Content-Types UID to cache
            "api::article.article",
            "api::tour.tour",
            "api::faq.faq",
            "api::customer.customer",
            "api::destination.destination",
            "api::gallery.gallery",
            "api::about-us.about-us",
            "api::home-page.home-page",
            "api::global.global",
          ],
        },
      },
    },
    // email: {
    //   config: {
    //     provider: 'sendgrid',
    //     providerOptions: {
    //       apiKey: env('SENDGRID_API_KEY'),
    //     },
    //     settings: {
    //       defaultFrom: env('DEFAULT_FROM_EMAIL'),
    //       defaultReplyTo: env('DEFAULT_TO_EMAIL'),
    //       testAddress: env('TEST_EMAIL_ADDRESS'),
    //     },
    //   },
    // },
  }
};
