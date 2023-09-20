var express = require('express');
var router = express.Router();

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
  // Verificar se existe uma sessão válida.
  isLogged = req.session.isLogged;
  console.log("[index.js] Valor da Session:", req.session);

  if (!isLogged) {
    console.log("[app.js] Entrou em isLogged")
    res.redirect("/Login");
  }
  next();
}; 


/* GET users listing. */
router.get('/', authenticationMiddleware ,function (req, res, next) {
  
  res.send('entrei no users');
});

module.exports = router;
