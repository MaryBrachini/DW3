const axios = require("axios");
const moment = require("moment");

//@ Abre o formulário de manutenção de alunos
const getAllAlunos = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllAlunos", {});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("alunos/view_manutencao", {
        title: "Manutenção de alunos",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlAlunos.js|getAllAlunos] Try Catch:Erro de requisição");
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  //@ *** Regra de validação
  //@ Como todos os campos podem ter valor nulo, vou me preocupar
  //@ com campo datanascimento. Caso ele tenha valor "", vou atribuir null a ele.

  if (regFormPar.datanascimento == "") {
    regFormPar.datanascimento = null;
  }

  return regFormPar;
}

//@ Abre e faz operações de CRUD no formulário de cadastro de alunos
const insertAlunos = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var cursos = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        cursos = await axios.get(
          process.env.SERVIDOR_DW3 + "/GetAllCursos",
          {}
        );
        //console.log("[crlAlunos|insertAlunos] valor de cursos:", cursos.data.registro);
        registro = {
          alunoid: 0,
          prontuario: "",
          nome: "",
          endereco: "",
          rendafamiliar: "0.00",
          datanascimento: "",
          cursoid: 0,
          deleted: false,
        };

        res.render("alunos/view_cadAlunos", {
          title: "Cadastro de alunos",
          data: registro,
          curso: cursos.data.registro,
          oper: oper,
          userName: userName,
        });
      } else {
        oper = "c";
        const alunoREG = validateForm(req.body);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertAlunos",
          {
            alunoid: 0,
            prontuario: alunoREG.prontuario,
            nome: alunoREG.nome,
            endereco: alunoREG.endereco,
            rendafamiliar: alunoREG.rendafamiliar,
            datanascimento: alunoREG.datanascimento,
            cursoid: alunoREG.cursoid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log("[ctlAlunos|insertAlunos] resp:", resp.data);
        if (resp.data.status == "ok") {
          registro = {
            alunoid: 0,
            prontuario: "",
            nome: "",
            endereco: "",
            rendafamiliar: "0.00",
            datanascimento: "",
            cursoid: 0,
            deleted: false,
          };
        } else {
          registro = alunoREG;
        }
        cursos = await axios.get(
          process.env.SERVIDOR_DW3 + "/GetAllCursos",
          {}
        );
        oper = "c";
        res.render("alunos/view_cadAlunos", {
          title: "Cadastro de alunos",
          data: registro,
          curso: cursos.data.registro,
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlAlunos.js|insertAlunos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Abre o formulário de cadastro de alunos para futura edição
const viewAlunos = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var cursos = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;

        parseInt(id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/getAlunoByID",
          {
            alunoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          registro = resp.data.registro[0];
          registro.datanascimento = moment(registro.datanascimento).format(
            "YYYY-MM-DD"
          );
          cursos = await axios.get(
            process.env.SERVIDOR_DW3 + "/GetAllCursos",
            {}
          );
          console.log("[ctlAlunos|viewAlunos] GET oper:", oper);

          res.render("alunos/view_cadAlunos", {
            title: "Cadastro de alunos",
            data: registro,
            curso: cursos.data.registro,
            oper: oper,
            userName: userName,
          });
        }
      } else {
        // Código vai entrar quando o usuário clicar no botão Alterar e requisição for POST
        oper = "vu";
        console.log("[ctlAlunos|viewAlunos] POST oper:", oper);
        const alunoREG = validateForm(req.body);
        console.log("[ctlAlunos|viewAlunos] POST id:", alunoREG.id);
        const id = parseInt(alunoREG.id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateAlunos",
          {
            alunoid: id,
            prontuario: alunoREG.prontuario,
            nome: alunoREG.nome,
            endereco: alunoREG.endereco,
            rendafamiliar: alunoREG.rendafamiliar,
            datanascimento: alunoREG.datanascimento,
            cursoid: alunoREG.cursoid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok" });
        } else {
          res.json({ status: "erro" });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlAlunos.js|viewAlunos] Aluno não pode ser alterado" });
      console.log(
        "[ctlAlunos.js|viewAlunos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Abre o formulário de cadastro de alunos
const DeleteAlunos = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      oper = "v";
      const id = parseInt(req.body.id);
    
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteAlunos",
        {
          alunoid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "erro" });
      }
    } catch (erro) {
      console.log(
        "[ctlAlunos.js|DeleteAlunos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

module.exports = {
  getAllAlunos,
  //cadAlunos,
  // getAlunoByID,
  viewAlunos,
  insertAlunos,
  // updateAlunos,
  DeleteAlunos,
};
