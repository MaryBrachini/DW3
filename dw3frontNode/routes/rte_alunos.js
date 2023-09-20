var express = require('express');
var alunosApp = require("../app/alunos/controller/ctlAlunos")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/', authenticationMiddleware, alunosApp.getAllAlunos);
router.get('/insertAlunos', authenticationMiddleware, alunosApp.insertAlunos);
router.get('/viewAlunos/:id/:oper', authenticationMiddleware, alunosApp.viewAlunos);

/* POST métodos */
router.post('/insertAlunos', authenticationMiddleware, alunosApp.insertAlunos);
router.post('/DeleteAlunos', authenticationMiddleware, alunosApp.DeleteAlunos);
router.post('/viewAlunos', authenticationMiddleware, alunosApp.viewAlunos);


module.exports = router;
