const mdlPedidos = require("../model/mdlPedidos");

const getAllPedidos = (req, res) =>
  (async () => {
    let pedidosREG = await mdlPedidos.getAllPedidos();
    res.json({ status: "ok", "registro pedidos": pedidosREG });
  })();

const getPedidosByID = (req, res) =>
  (async () => {
    const pedidoID = parseInt(req.body.pedidoid);
    let pedidosREG = await mdlPedidos.getPedidosByID(pedidoID);

    res.json({ status: "ok", "registro pedidos": pedidosREG });
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
    let  { msg, linhasAfetadas } = await mdlPedidos.updatePedidos(pedidosREG);
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