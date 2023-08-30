const mdlPedidos = require("../model/mdlPedidos");

const getAllPedidos = (req, res) =>
  (async () => {
    let registro = await mdlPedidos.getAllPedidos();
    res.json({ status: "ok", "registro": registro });
  })();

const getPedidosByID = (req, res) =>
  (async () => {
    const pedidosID = parseInt(req.body.pedidosid);
    let registro = await mdlPedidos.getPedidosByID(pedidosID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertPedidos = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const pedidosREG = request.body;    
    let { msg, linhasAfetadas } = await mdlPedidos.insertPedidos(pedidosREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updatePedidos = (request, res) =>
  (async () => {
    const pedidosREG = request.body;
    let  { msg, linhasAfetadas } = await mdlPedidos.UpdatePedidos(pedidosREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeletePedidos = (request, res) =>
  (async () => {
    const pedidosREG = request.body;
    let { msg, linhasAfetadas } = await mdlPedidos.DeletePedidos(pedidosREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllPedidos,
  getPedidosByID,
  insertPedidos,
  updatePedidos,
  DeletePedidos
};