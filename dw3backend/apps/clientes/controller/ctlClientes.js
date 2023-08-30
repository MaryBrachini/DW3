const mdlClientes = require("../model/mdlClientes");

const getAllClientes = (req, res) =>
  (async () => {
    let registro = await mdlClientes.getAllClientes();
    res.json({ status: "ok", "registro": registro });
  })();

const getClientesByID = (req, res) =>
  (async () => {
    const clientesID = parseInt(req.body.clienteid);
    let registro = await mdlClientes.getClientesByID(clienteID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertClientes = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const clienteREG = request.body;    
    let { msg, linhasAfetadas } = await mdlClientes.insertClientes(clienteREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateClientes = (request, res) =>
  (async () => {
    const clienteREG = request.body;
    let  { msg, linhasAfetadas } = await mdlClientes.UpdateClientes(clienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteClientes = (request, res) =>
  (async () => {
    const clienteREG = request.body;
    let { msg, linhasAfetadas } = await mdlClientes.DeleteClientes(clienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllClientes,
  getClientesByID,
  insertClientes,
  updateClientes,
  DeleteClientes
};