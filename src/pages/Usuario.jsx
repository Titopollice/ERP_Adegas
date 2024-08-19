import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./Usuario.css";

const Usuario = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarioLogin, setLogin] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");

  // Carregar todos os usuários ao montar o componente
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usuario")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  // Função para buscar usuários com base no termo de pesquisa
  const buscarUsuarios = () => {
    axios
      .get(`http://localhost:8080/api/usuario?search=${searchTerm}`)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  };

  // Função para adicionar um novo usuário
  const adicionarUsuario = () => {
    const novoUsuario = {
      usuarioLogin,
      nomeCompleto,
      email,
      telefone,
      cpf,
      cargo,
      dataNascimento,
      senha,
    };

    axios
      .post("http://localhost:8080/api/usuario", novoUsuario)
      .then((response) => {
        setUsuarios([...usuarios, response.data]);
        // Limpar os campos após a adição
        setUsuarioLogin("");
        setNomeCompleto("");
        setEmail("");
        setTelefone("");
        setCpf("");
        setCargo("");
        setDataNascimento("");
        setSenha("");
      })
      .catch((error) => {
        console.error("Erro ao adicionar usuário:", error);
      });
  };

  // Função para excluir um usuário
  const excluirUsuario = (id) => {
    axios
      .delete(`http://localhost:8080/api/usuario/${id}`)
      .then(() => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao excluir usuário:", error);
      });
  };

  return (
    <div className="users-container">
      <header className="users-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Administração de Sistema</h1>
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

      <div className="users-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Usuários</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-add flex items-center"
            onClick={adicionarUsuario}
          >
            <FaPlus className="mr-2" />
            Adicionar
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>

      <main className="users-main p-6">
        <div className="users-search flex mb-6">
          <input
            type="text"
            placeholder="Usuários"
            className="input-search w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-search ml-4" onClick={buscarUsuarios}>
            <FaSearch />
          </button>
        </div>

        <div className="users-table overflow-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Usuário</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="border p-2">{usuario.usuario}</td>
                  <td className="border p-2">{usuario.nomeCompleto}</td>
                  <td className="border p-2">{usuario.email}</td>
                  <td className="border p-2">{usuario.status}</td>
                  <td className="border p-2">
                    <button
                      className="btn btn-delete flex items-center"
                      onClick={() => excluirUsuario(usuario.id)}
                    >
                      <FaTrash className="mr-2" />
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="users-details mt-8">
          <h3 className="text-lg mb-4">Nome Completo</h3>
          <input
            type="text"
            placeholder="Nome Completo"
            className="input-detail mb-4 w-full"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Data de nascimento"
              className="input-detail"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cargo"
              className="input-detail"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
            <input
              type="text"
              placeholder="CPF"
              className="input-detail"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <input
              type="text"
              placeholder="Usuário"
              className="input-detail"
              value={usuarioLogin}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="text"
              placeholder="Telefone"
              className="input-detail"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-detail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="input-detail"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
        </div>

        <div className="users-actions mt-8 flex justify-between">
          <button
            className="btn btn-delete flex items-center"
            onClick={() => excluirUsuario(selectedUserId)}
          >
            <FaTrash className="mr-2" />
            Excluir
          </button>
          <button className="btn btn-save" onClick={adicionarUsuario}>
            Salvar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Usuario;
