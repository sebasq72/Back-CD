/**
 * LogIn.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      type: "string",
      required: true,
      unique: true,
      example: "test123",
      description: "User name to login in the app",
    },
    password: {
      type: "string",
      required: true,
      example: "123456!#$",
      description: "Password to login in the app",
    },
    name: {
      type: "string",
      required: true,
      example: "test",
      description: "Name from customer",
    },
    surnames: {
      type: "string",
      required: true,
      example: "test1 test2",
      description: "Surnames from customer",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: "test@test.com",
      description: "Unique valid email address",
    },
    phone: {
      type: "number",
      required: true,
      unique: true,
      example: "3006326907",
      description: "Phone from customer",
    },
    // emailProofToken: {
    //   type: "string",
    //   description: "This will be used in the account verification email",
    // },
    // emailProofTokenExpiresAt: {
    //   type: "number",
    //   description:
    //     "time in milliseconds representing when the emailProofToken will expire",
    // },
    // passwordResetToken: {
    //   type: "string",
    //   description:
    //     "A unique token used to verify the user's identity when recovering a password.",
    // },
    // passwordResetTokenExpiresAt: {
    //   type: "number",
    //   description:
    //     "A timestamp representing the moment when this user's `passwordResetToken` will expire (or 0 if the user currently has no such token).",
    //   example: 1508944074211,
    // },
  },
};
