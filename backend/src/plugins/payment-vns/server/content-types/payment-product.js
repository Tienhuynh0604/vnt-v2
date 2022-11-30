module.exports = {
  "kind": "collectionType",
  "collectionName": "payment-product",
  "info": {
    "singularName": "payment-product",
    "pluralName": "payment-products",
    "displayName": "Payment Product"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string"
    },
    "routerId": {
      "type": "integer"
    },
    "cityId": {
      "type": "integer"
    },
    "type": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "status": {
      "type": "boolean"
    },
    "startPoint": {
      "type": "string"
    },
    "endPoint": {
      "type": "string"
    },
    "priceList": {
      "type": "json"
    }
  }
};
