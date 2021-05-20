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
      statusCode: 404,
      description: "User not found",
    },
    passwordMismatch: {
      statusCode: 401,
      description: "Password do not match",
    },
    operationalError: {
      statusCode: 400,
      description: "The request was formed properly",
    },
  },


  fn: async  function (inputs, exits) {
    try {

      //Se hace la consulta a la bd filtrando por el usuario
      let _user = await LogIn.findOne({ user: inputs.user.toLowerCase() });

      //Si no existe devuevle error
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
          exits.passwordMismatch({ error: error.message });
        });

      //Generación de token
      const token = await sails.helpers.generateNewJwtToken(_user.user);

      //Retorna exitoso
      return exits.success({
        message: `${_user.user} has been logged in`,
        //data: _user,
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
