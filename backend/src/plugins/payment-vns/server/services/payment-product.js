module.exports = ({ strapi }) => ({
    async findOne(id) {
        return await strapi.entityService.findOne('plugin::payment-vns.payment-product'
            , id);
    }
})