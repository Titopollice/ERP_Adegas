import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import InputMask from "react-input-mask";
import "./Cliente.css";

const Cliente = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cliente")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  const buscarClientes = () => {
    axios
      .get(`http://localhost:8080/api/cliente?search=${searchTerm}`)
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  };

  const adicionarCliente = () => {
    const novoCliente = {
      nome,
      cpf,
      endereco,
      numero,
      bairro,
      telefone,
      email,
    };

    axios
      .post("http://localhost:8080/api/cliente", novoCliente)
      .then((response) => {
        setClientes([...clientes, response.data]);
        buscarClientes();
        limparCampos();
      })
      .catch((error) => {
        console.error("Erro ao adicionar cliente:", error);
      });
  };

  const atualizarCliente = () => {
    const clienteAtualizado = {
      nome,
      cpf,
      endereco,
      numero,
      bairro,
      telefone,
      email,
    };

    axios
      .put(`http://localhost:8080/api/cliente/${selectedClienteId}`, clienteAtualizado)
      .then((response) => {
        setClientes(
          clientes.map((cliente) =>
            cliente.clienteID === selectedClienteId ? response.data : cliente
          )
        );
        buscarClientes();
        limparCampos();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar cliente:", error);
      });
  };

  const excluirCliente = (id) => {
    axios
      .patch(`http://localhost:8080/api/cliente/${id}`)
      .then(() => {
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.clienteID === id ? { ...cliente, status: cliente.status === 'Ativo' ? 'Inativo' : 'Ativo' } : cliente
          )
        );
        buscarClientes();
      })
      .catch((error) => {
        console.error("Erro ao alterar o status do cliente:", error);
      });
  };

  const editarCliente = (cliente) => {
    setSelectedClienteId(cliente.clienteID);
    setNome(cliente.nome);
    setCpf(cliente.cpf);
    setEndereco(cliente.endereco);
    setNumero(cliente.numero);
    setBairro(cliente.bairro);
    setTelefone(cliente.telefone);
    setEmail(cliente.email);
    setIsEditing(true);
  };

  const limparCampos = () => {
    setNome("");
    setCpf("");
    setEndereco("");
    setNumero("");
    setBairro("");
    setTelefone("");
    setEmail("");
    setSelectedClienteId(null);
    setIsEditing(false);
  };

  return (
    <div className="clientes-container">
      <header className="clientes-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Administração de Clientes</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="text-lg cursor-pointer"
              title="Voltar"
            />
          </div>
        </div>
      </header>

      <div className="clientes-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Clientes</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-add flex items-center"
            onClick={adicionarCliente}
            disabled={isEditing}
          >
            <FaPlus className="mr-2" />
            Adicionar
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>

      <main className="clientes-main p-6">
        <div className="clientes-search flex mb-6">
          <input
            type="text"
            placeholder="Clientes"
            className="input-search w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-search ml-4" onClick={buscarClientes}>
            <FaSearch />
          </button>
        </div>

        <div className="clientes-table overflow-auto mb-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">CPF</th>
                <th className="border p-2">Endereço</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <tr key={cliente.clienteID}>
                    <td className="border p-2 text-center">{cliente.clienteID}</td>
                    <td className="border p-2 text-center">{cliente.nome}</td>
                    <td className="border p-2 text-center">{cliente.cpf}</td>
                    <td className="border p-2 text-center">{cliente.endereco}</td>
                    <td className="border p-2 text-center">{cliente.status}</td>
                    <td className="border p-2 text-center flex justify-center">
                      <button
                        className="btn btn-edit flex items-center mr-2"
                        style={{ backgroundColor: "yellow" }}
                        onClick={() => editarCliente(cliente)}
                      >
                        <FaEdit className="mr-2" />
                        Editar
                      </button>
                      <button
                        className="btn btn-delete flex items-center"
                        onClick={() => excluirCliente(cliente.clienteID)}
                      >
                        <FaTrash className="mr-2" />
                        {cliente.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border p-2 text-center">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="clientes-details mt-8">
          <h3 className="text-lg mb-4">Dados do Cliente</h3>
          <input
            type="text"
            placeholder="Nome"
            className="input-detail mb-4 w-full"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputMask
              mask="999.999.999-99"
              placeholder="CPF"
              className="input-detail"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <input
              type="text"
              placeholder="Endereço"
              className="input-detail"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <input
              type="text"
              placeholder="Número"
              className="input-detail"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <input
              type="text"
              placeholder="Bairro"
              className="input-detail"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            <InputMask
              mask="(99) 99999-9999"
              placeholder="Telefone"
              className="input-detail"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-detail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4">
            {isEditing ? (
              <button
                className="btn btn-update flex items-center"
                onClick={atualizarCliente}
              >
                <FaEdit className="mr-2" />
                Atualizar
              </button>
            ) : (
              <button
                className="btn btn-save flex items-center"
                onClick={adicionarCliente}
                disabled={isEditing}
              >
                <FaPlus className="mr-2" />
                Salvar
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cliente;
    