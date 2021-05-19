/**
 * DiscController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: function (req, res) {
    Disc.find()
      .then(function (disc) {
        if (!disc || disc.length === 0) {
          return res.send({
            success: false,
            message: "Sin registros",
          });
        }
        debugger;
        return res.send({
          success: true,
          message: "solicitud exitosa",
          data: disc,
        });
      })
      .catch(function (err) {
        return res.send({
          success: false,
          message: "Ha ocurrido un error en la solicitud",
        });
      });
  },

  create: function (req, res) {
    //sails.log.debug(req.allParams())
    Disc.create(req.allParams())
      .then(function (disc) {
        return res.send({
          success: true,
          message: "Se agrego el disco de manera exitosa",
        });
      })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          success: false,
          message: "Ha ocurrido un error en la solicitud",
        });
      });
  },

  update: function (req, res) {
    Disc.update(req.param("id"), req.allParams())
      .then(function (disc) {
        return res.send({
          success: true,
          message: "Se actualizo el disco de manera exitosa",
        });
      })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          success: false,
          message: "Ha ocurrido un error en la solicitud",
        });
      });
  },

  delete: function (req, res) {
    Disc.destroy(req.param("id"))
      .then(function (disc) {
        return res.send({
          success: true,
          message: "Se ha borrado correctamente",
        });
      })
      .catch(function (err) {
        sails.log.debug(err);
        return res.send({
          success: false,
          message: "Ha ocurrido un error en la solicitud",
        });
      });
  },
};
