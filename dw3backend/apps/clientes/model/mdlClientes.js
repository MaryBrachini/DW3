const db = require("../../../database/databaseconfig");

const getAllClientes = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM clientes where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getClientesByID = async (clienteIDPar) => {
  return (
    await db.query(
      "SELECT * " + "FROM clientes WHERE clienteid = $1 and deleted = false ORDER BY nome ASC",
      [clienteIDPar]
    )
  ).rows;
};

const insertClientes = async (clientesREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO clientes " + "values(default, $1, $2, $3, $4, $5, $6)",
        [
          clientesREGPar.codigo,
          clientesREGPar.nome,
          clientesREGPar.endereco,
          clientesREGPar.datanascimento,
          clientesREGPar.ativo,
          clientesREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateClientes = async (clientesREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE clientes SET " +
        "codigo = $2, " +
        "nome = $3, " +
        "endereco = $4, " +
        "datanascimento = $5, " +
        "cursoid = $6, " +
        "deleted = $7 " +
        "WHERE clienteid = $1",
        [
          clientesREGPar.codigo,
          clientesREGPar.nome,
          clientesREGPar.endereco,
          clientesREGPar.rendafamiliar,
          clientesREGPar.datanascimento,
          clientesREGPar.cursoid,
          clientesREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|UpdateClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteClientes = async (clientesREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE clientes SET " + "deleted = true " + "WHERE clienteid = $1",
        [clientesREGPar.clienteid]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|DeleteClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllClientes,
  getClientesByID,
  insertClientes,
  UpdateClientes,
  DeleteClientes,
};