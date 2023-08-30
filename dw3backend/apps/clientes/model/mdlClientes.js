const db = require("../../../database/databaseconfig");

const getAllClientes = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = clientes.cursoid)" +
        "FROM clientes where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getClientesByID = async (clientesIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = clientes.cursoid)" +
        "FROM clientes WHERE clientesid = $1 and deleted = false ORDER BY nome ASC",
      [clientesIDPar]
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
        "INSERT INTO clientes " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
            clientesREGPar.prontuario,
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
          "prontuario = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "rendafamiliar = $5, " +
          "datanascimento = $6, " +
          "cursoid = $7, " +
          "deleted = $8 " +
          "WHERE clientesid = $1",
        [
            clientesREGPar.clientesid,
            clientesREGPar.prontuario,
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
      "UPDATE clientes SET " + "deleted = true " + "WHERE clientesid = $1",
      [clientesREGPar.clientesid]
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