const db = require("../../../database/databaseconfig");

const getAllPedidos = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = pedidos.cursoid)" +
        "FROM pedidos where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getPedidosByID = async (pedidosIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = pedidos.cursoid)" +
        "FROM pedidos WHERE pedidosid = $1 and deleted = false ORDER BY nome ASC",
      [pedidosIDPar]
    )
  ).rows;
};

const insertPedidos = async (pedidosREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO pedidos " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
            pedidosREGPar.prontuario,
            pedidosREGPar.nome,
            pedidosREGPar.endereco,
            pedidosREGPar.rendafamiliar,
            pedidosREGPar.datanascimento,
            pedidosREGPar.cursoid,
            pedidosREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdatePedidos = async (pedidosREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE pedidos SET " +
          "prontuario = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "rendafamiliar = $5, " +
          "datanascimento = $6, " +
          "cursoid = $7, " +
          "deleted = $8 " +
          "WHERE pedidosid = $1",
        [
            pedidosREGPar.pedidosid,
            pedidosREGPar.prontuario,
            pedidosREGPar.nome,
            pedidosREGPar.endereco,
            pedidosREGPar.rendafamiliar,
            pedidosREGPar.datanascimento,
            pedidosREGPar.cursoid,
            pedidosREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|UpdatePedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeletePedidos = async (pedidosREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE pedidos SET " + "deleted = true " + "WHERE pedidosid = $1",
      [pedidosREGPar.pedidosid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlPedidos|DeletePedidos] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllPedidos,
  getPedidosByID,
  insertPedidos,
  UpdatePedidos,
  DeletePedidos,
};