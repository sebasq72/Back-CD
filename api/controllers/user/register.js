/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: "Register",
  description: "Register user.",

  inputs: {
    user: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
    },
    name: {
      type: "string",
      required: true,
    },
    surnames: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    phone: {
      type: "number",
      required: true,
    },
    rol: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "New muna user created",
    },
    email_userName_AlreadyInUse: {
      statusCode: 200,
      description: "Email address or user name already in use",
    },
    error: {
      statusCode: 200,
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {

    inputs.user = inputs.user.toLowerCase();
    inputs.email = inputs.email.toLowerCase();

    sails.helpers.passwords.hashPassword(inputs.password).then((cifrada) => {
      inputs.password = cifrada;

      LogIn.create(inputs)
        .then(function (login) {
          return exits.success({
            message: `An account has been created for ${inputs.user} successfully.`,
            success: true,
          });
        })
        .catch(function (error) {
          sails.log.debug(error);
          if (error.code === "E_UNIQUE") {
            return exits.email_userName_AlreadyInUse({
              message: "Oops :) an error occurred - This email address or user name already exits",
              success: false,
            });
          }
          return exits.error({
            message: "Oops :) an error occurred - " + error.message,
            success: false,
          });
        });
    });
  },
};
