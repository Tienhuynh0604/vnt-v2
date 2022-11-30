'use strict';
const helper = require("./../util/request-helper");

const pluginId = 'plugin::payment-vns.payment-product';

function getPluginStore() {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'payment-vns'
  })
}

async function createDefaultConfig() {
  const pluginStore = getPluginStore();
  const value = {
    apiUrl: '',
    apiKey: '',
  };
  await pluginStore.set({key: 'settings', value});
  return pluginStore.get({key: 'settings'});
}

module.exports = ({strapi}) => ({
  async getSettings() {
    const pluginStore = getPluginStore();
    let config = await pluginStore.get({key: 'settings'});
    if (!config) {
      config = await createDefaultConfig();
    }
    return config;
  },

  async setSettings(settings) {
    const value = settings;
    const pluginStore = getPluginStore();
    await pluginStore.set({key: 'settings', value});
    return pluginStore.get({key: 'settings'});
  },

  async getCatalogs(ctx) {
    const {locale = "en"} = ctx.query;
    const axiosInstance = await helper.request({strapi});
    return await axiosInstance.get(`/web-v1/catalog`, {
      headers: {
        'x-language': locale
      }
    });
  },
  async getServices({locale = "en", city_id}) {
    if (!city_id) {
      throw new Error("Missing city_id");
    }
    const axiosInstance = await helper.request({strapi});
    return await axiosInstance.get(`/web-v1/services`, {
      params: {
        city_id
      },
      headers: {
        'x-language': locale
      }
    });
  },

  async syncServices({data}) {
    console.log("SyncService");
    const updateEntries = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      const service = data[i];
      let updatedIds = [];
      const entries = await strapi.entityService.findMany(pluginId, {
        filters: {
          cityId: service.city_id,
          routerId: service.router_id,
        }
      });
      console.log(entries);
      const updateData = {
        name: service.name,
        type: service.type,
        description: service.description,
        startPoint: service.startpoint,
        endPoint: service.endpoint,
        priceList: service.prices,
        status: true,
      };
      if (entries.length === 0) {
        const entry = await strapi.entityService.create(pluginId, {
          data: {
            cityId: service.city_id,
            routerId: service.router_id,
            ...updateData
          }
        });
        console.log("Created", entry);
        updatedIds.push(entry.id);
        updateEntries.push(entry);
      } else {
        entries.map(async (item) => {
          const entry = await strapi.entityService.update(pluginId, item.id, {
            data: {
              ...updateData
            }
          });
          console.log("Updated", entry);
          updatedIds.push(entry.id);
          updateEntries.push(entry);
          return entry;
        })
      }

      console.log("updateIds", updatedIds);
    }
    return updateEntries
  },
});
