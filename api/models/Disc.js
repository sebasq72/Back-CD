/**
 * Disc.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: { type: 'string', required: true, },
    description: { type: 'string', required: true, },
    type: { type: 'string', required: true, },

    artist: { type: 'string', required: true, },
    released: { type: 'string', required: true, },
    genre: { type: 'string', required: true, },

    price: { type: 'number', required: true, },

    image: { type: 'string', required: true, },

  },

};

