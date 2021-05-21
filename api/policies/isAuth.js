module.exports = async function (req, res, proceed) {
  var token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({
      mensaje: "Es necesario el token de autenticación",
      success: false,
    });
    return;
  }

  token = token.replace("Bearer ", "");

  //sails.log(token);

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZWJhc3E3MiIsImlzcyI6Ik11c2ljIFN0b3JlIFNhaWxzIEFQSSIsImlhdCI6MTYyMTQ4MTY4NywiZXhwIjoxNjIxNTY4MDg3fQ.WMvzPgxIJoXBvdbGa4QgMwYVneIIsOFUGqTMV-oCUJA

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZWJhc3E3MiIsImlzcyI6Ik11c2ljIFN0b3JlIFNhaWxzIEFQSSIsImlhdCI6MTYyMTQ4MjQ4OSwiZXhwIjoxNjIxNDg2MDg5fQ.Klq0_ASfhkacSTHMIYD9jOiRP9eGOZArUukTMq6Ct7E

  sails.helpers.jwTokenValidate
    .with({
      token: token,
    })
    .then((resp) => {
      sails.log(resp);
      if (resp) {
        if (res.exp < Date.now() / 1000) {
          res.status(401).send({
            mensaje: "Token ha expirado, regrese al login",
            success: false,
          });
        } else {
          return proceed();
        }
      } else {
        //return res.forbidden();

        res.status(401).send({
          mensaje: "Token inválido",
          success: false,
        });
      }
    })
    .catch((err) => {
      //return res.forbidden();

      res.status(401).send({
        mensaje: "Catch Token inválido",
        success: false,
      });
    });
};
