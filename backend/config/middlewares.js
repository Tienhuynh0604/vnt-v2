module.exports = ({env}) => {

  const origin = [
    'http://localhost:1337'
    , 'http://localhost:8000'
  ];

  origin.push(...env('CLIENT_DOMAIN', '').split(","));

  return [
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', "maps.googleapis.com", "editor.unlayer.com"],
            'img-src': ["'self'", 'data:', 'blob:', 'cdn.jsdelivr.net', 'strapi.io', "maps.gstatic.com", "maps.googleapis.com", "editor.unlayer.com","dl.airtable.com"],
            'media-src': ["'self'", 'data:', 'blob:', "maps.gstatic.com", "maps.googleapis.com", "editor.unlayer.com"],
            'frame-src': ["'self'", "editor.unlayer.com"],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::poweredBy',
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        headers: '*',
        origin
      }
    },
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
}
