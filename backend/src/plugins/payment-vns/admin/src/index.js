import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import SyncPopup from "./components/SyncPopup";
import PriceList from './components/PriceList';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: 'Payment VNS',
        },
      },
      [
        {
          intlLabel: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: 'Configuration',
          },
          id: 'settings',
          to: `/settings/${pluginId}`,
          Component: async () => {
            return import('./pages/Settings');
          },
        },
      ]
    );
    app.customFields.register({
      name: "VnsPriceList",
      type: "json",
      pluginId: "payment-vns",
      intlLabel: {
        id: `${pluginId}.plugin.priceList`,
        defaultMessage: 'VsnPriceList',
      },
      intlDescription: {
        id: `${pluginId}.plugin.priceDes`,
        defaultMessage: 'Select Price list',
      },
      components: {
        Input: async () => {
          return import('./components/PriceList');
        }
      },    
    })
  },

  bootstrap(app) {
    app.injectContentManagerComponent('listView', 'actions', {
      name: 'Payment VNS Sync',
      Component: SyncPopup,
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
