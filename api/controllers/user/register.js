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
  },

  exits: {
    success: {
      statusCode: 201,
      description: "New muna user created",
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: "Email address already in use",
    },
    error: {
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
          });
        })
        .catch(function (error) {
          sails.log.debug(err);
          if (error.code === "E_UNIQUE") {
            return exits.emailAlreadyInUse({
              message: "Oops :) an error occurred",
              error: "This email address already exits",
            });
          }
          return exits.error({
            message: "Oops :) an error occurred",
            error: error.message,
          });
        });
    });
  },
};