import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import InputMask from "react-input-mask";
import "./Fornecedor.css";

const Fornecedor = () => {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razao, setRazao] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [complemento, setComplemento] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFornecedorId, setSelectedFornecedorId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/fornecedor")
      .then((response) => {
        setFornecedores(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar fornecedores:", error);
      });
      const loggedInUser = localStorage.getItem("userName"); // Pega do localStorage
    if (loggedInUser) {
      setUserName(loggedInUser); // Define o nome do usuário no estado
    }
  }, []);

  const buscarFornecedores = () => {
    if (searchTerm.trim() === "") {
      // Se o campo de pesquisa estiver vazio, busque todos os produtos
      axios
        .get("http://localhost:8080/api/fornecedor")
        .then((response) => {
          setFornecedores(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar fornecedor:", error);
        });
    } else {
      // Se houver termo de pesquisa, busque por nome
      axios
        .get(`http://localhost:8080/api/fornecedor/nome/${searchTerm}`)
        .then((response) => {
          setFornecedores(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar fornecedor pelo nome:", error);
        });
    }
  };

  const adicionarFornecedor = () => {
    const novoFornecedor = {
      nome,
      cnpj,
      razao,
      numero,
      bairro,
      telefone,
      complemento,
      email,
    };

    axios
      .post("http://localhost:8080/api/fornecedor", novoFornecedor)
      .then((response) => {
        setFornecedores([...fornecedores, response.data]);
        buscarFornecedores();
        limparCampos();
      })
      .catch((error) => {
        console.error("Erro ao adicionar fornecedor:", error);
      });
  };

  const atualizarFornecedor = () => {
    const fornecedorAtualizado = {
      nome,
      cnpj,
      razao,
      numero,
      bairro,
      telefone,
      complemento,
      email,
    };

    axios
      .put(`http://localhost:8080/api/fornecedor/${selectedFornecedorId}`, fornecedorAtualizado)
      .then((response) => {
        setFornecedores(
          fornecedores.map((fornecedor) =>
            fornecedor.fornecedorID === selectedFornecedorId ? response.data : fornecedor
          )
        );
        buscarFornecedores();
        limparCampos();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar fornecedor:", error);
      });
  };

  const excluirFornecedor = (id) => {
    axios
      .patch(`http://localhost:8080/api/fornecedor/${id}`)
      .then(() => {
        setFornecedores((prevFornecedores) =>
          prevFornecedores.map((fornecedor) =>
            fornecedor.fornecedorID === id ? { ...fornecedor, status: fornecedor.status === 'Ativo' ? 'Inativo' : 'Ativo' } : fornecedor
          )
        );
        buscarFornecedores();
      })
      .catch((error) => {
        console.error("Erro ao alterar o status do fornecedor:", error);
      });
  };

  const editarFornecedor = (fornecedor) => {
    setSelectedFornecedorId(fornecedor.fornecedorID);
    setNome(fornecedor.nome);
    setCnpj(fornecedor.cnpj);
    setRazao(fornecedor.razao);
    setNumero(fornecedor.numero);
    setBairro(fornecedor.bairro);
    setTelefone(fornecedor.telefone);
    setComplemento(fornecedor.complemento);
    setEmail(fornecedor.email);
    setIsEditing(true);
  };

  const limparCampos = () => {
    setNome("");
    setCnpj("");
    setRazao("");
    setNumero("");
    setBairro("");
    setTelefone("");
    setComplemento("");
    setEmail("");
    setSelectedFornecedorId(null);
    setIsEditing(false);
  };

  return (
    <div className="suppliers-container">
      <header className="suppliers-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Administração de Fornecedores</h1>
        <div className="flex items-center space-x-4">
        <span className="text-whrite-800">{userName}</span> 
          <div className="flex items-center space-x-2">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="text-lg cursor-pointer"
              title="Voltar"
            />
          </div>
        </div>
      </header>

      <div className="suppliers-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Fornecedores</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-add flex items-center"
            onClick={adicionarFornecedor}
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

      <main className="suppliers-main p-6">
        <div className="suppliers-search flex mb-6">
          <input
            type="text"
            placeholder="Fornecedores"
            className="input-search w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-search ml-4" onClick={buscarFornecedores}>
            <FaSearch />
          </button>
        </div>

        <div className="suppliers-table overflow-auto mb-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">CNPJ</th>
                <th className="border p-2">Razão Social</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.length > 0 ? (
                fornecedores.map((fornecedor) => (
                  <tr key={fornecedor.fornecedorID}>
                    <td className="border p-2 text-center">{fornecedor.fornecedorID}</td>
                    <td className="border p-2 text-center">{fornecedor.nome}</td>
                    <td className="border p-2 text-center">{fornecedor.cnpj}</td>
                    <td className="border p-2 text-center">{fornecedor.razao}</td>
                    <td className="border p-2 text-center">{fornecedor.status}</td>
                    <td className="border p-2 text-center flex justify-center">
                      <button
                        className="btn btn-edit flex items-center mr-2"
                        style={{ backgroundColor: "yellow" }}
                        onClick={() => editarFornecedor(fornecedor)}
                      >
                        <FaEdit className="mr-2" />
                        Editar
                      </button>
                      <button
                        className="btn btn-delete flex items-center"
                        onClick={() => excluirFornecedor(fornecedor.fornecedorID)}
                      >
                        <FaTrash className="mr-2" />
                        {fornecedor.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border p-2 text-center">
                    Nenhum fornecedor encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="suppliers-details mt-8">
          <h3 className="text-lg mb-4">Dados do Fornecedor</h3>
          <input
            type="text"
            placeholder="Nome Fantasia"
            className="input-detail mb-4 w-full"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputMask
              mask="99.999.999/9999-99"
              placeholder="CNPJ"
              className="input-detail"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <input
              type="text"
              placeholder="Razão Social"
              className="input-detail"
              value={razao}
              onChange={(e) => setRazao(e.target.value)}
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
              type="text"
              placeholder="Complemento"
              className="input-detail"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-detail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="suppliers-actions mt-8 flex justify-between">
            {isEditing ? (
              <>
                <button
                  className="btn btn-update"
                  onClick={atualizarFornecedor}
                >
                  Atualizar
                </button>
                <button
                  className="btn btn-clear flex items-center"
                  onClick={limparCampos}
                >
                  <FaTrash className="mr-2" />
                  Limpar
                </button>
              </>
            ) : (
              <button
                className="btn btn-save"
                onClick={adicionarFornecedor}
              >
                Salvar
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Fornecedor;
