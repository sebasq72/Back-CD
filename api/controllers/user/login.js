/**
 * LogInController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  friendlyName: 'Login',
  description: 'Login user.',

  inputs: {
    user: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Login successful",
    },
    notAUser: {
      statusCode: 200,
      description: "User not found",
    },
    passwordMismatch: {
      statusCode: 200,
      description: "Password do not match",
    },
    operationalError: {
      statusCode: 200,
      description: "The request was formed properly",
    },
  },


  fn: async  function (inputs, exits) {
    try {

      //Se hace la consulta a la bd filtrando por el usuario
      let _user = await LogIn.findOne({ user: inputs.user.toLowerCase() });

      //Si no existe devuelve error
      if (!_user) {
        return exits.notAUser({
          message: `An account belonging to ${inputs.user} was not found`,
          success: false,
        });
      }

      //Verifica la clave encriptada con lo que llega por parametro
      await sails.helpers.passwords
        .checkPassword(inputs.password, _user.password)
        .intercept("incorrect", (error) => {
          exits.passwordMismatch({
            message: error.message,
            success: false,
          });
        });

      //Generación de token
      const token = await sails.helpers.generateNewJwtToken(_user.user);

      //Retorna exitoso
      return exits.success({
        message: `${_user.user} has been logged in`,
        rol: _user.rol,
        success: true,
        token,
      });
    } catch (error) {
      sails.log.error(error);
      if (error.isOperational) {
        return exits.operationalError({
          message: `Error logging in user ${inputs.user} ` + error.raw,
          success: false,
        });
      }
      return exits.error({
        message: `Error logging in user ${inputs.user} - ` + error.message,
        success: false,
      });
    }
  }
};
