const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Jw token validate",

  description: "",

  inputs: {
    token: {
      type: "string",
      friendlyName: "token",
      description: "token de la peticion.",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    const tokenSecret = sails.config.jwtSecret || process.env.JWT_SECRET;
    return jwt.verify(inputs.token, tokenSecret);
  },
};
