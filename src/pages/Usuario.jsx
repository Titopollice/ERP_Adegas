import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import InputMask from "react-input-mask";
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
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const buscarUsuarios = () => {
    axios
      .get(`http://localhost:8080/api/usuario?search=${selectedUserId}`)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  };

  const formatarData = (data) => {
    const dataSemMascara = data.replace(/[^0-9]/g, "");
    if (dataSemMascara.length === 8) {
      const ano = dataSemMascara.substring(4, 8);
      const mes = dataSemMascara.substring(2, 4);
      const dia = dataSemMascara.substring(0, 2);
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  };

  const adicionarUsuario = () => {
    const novoUsuario = {
      usuarioLogin,
      nomeCompleto,
      email,
      telefone,
      cpf,
      cargo,
      dataNascimento: formatarData(dataNascimento),
      senha,
    };

    axios
      .post("http://localhost:8080/api/usuario", novoUsuario)
      .then((response) => {
        setUsuarios([...usuarios, response.data]);
        buscarUsuarios();
        limparCampos();
      })
      .catch((error) => {
        console.error("Erro ao adicionar usuário:", error);
      });
  };

  const atualizarUsuario = () => {
    const usuarioAtualizado = {
      usuarioLogin,
      nomeCompleto,
      email,
      telefone,
      cpf,
      cargo,
      dataNascimento: formatarData(dataNascimento),
      senha,
    };

    axios
      .put(`http://localhost:8080/api/usuario/${selectedUserId}`, usuarioAtualizado)
      .then((response) => {
        setUsuarios(
          usuarios.map((usuario) =>
            usuario.id === selectedUserId ? response.data : usuario
          )
        );
        buscarUsuarios();            
        limparCampos();
        setIsEditing(false); // Desativa o modo de edição após a atualização
      })
      .catch((error) => {
        console.error("Erro ao atualizar usuário:", error);
      });
  };

  const excluirUsuario = (id) => {
    axios
      .patch(`http://localhost:8080/api/usuario/${id}`)
      .then(() => {
        // Atualiza a lista de usuários para refletir a mudança de status.
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === id ? { ...usuario, status: usuario.status === 'Ativo' ? 'Inativo' : 'Ativo' } : usuario
          )
        );
        buscarUsuarios();
      })
      .catch((error) => {
        console.error("Erro ao alterar o status do usuário:", error);
      });
      
  };

  const editarUsuario = (usuario) => {
    console.log("Editando usuário com ID:", usuario.usuarioID); // Adicionado para depuração

    setSelectedUserId(usuario.usuarioID);
    setLogin(usuario.usuarioLogin);
    setNomeCompleto(usuario.nomeCompleto);
    setEmail(usuario.email);
    setTelefone(usuario.telefone);
    setCpf(usuario.cpf);
    setCargo(usuario.cargo);
    setDataNascimento(usuario.dataNascimento);
    setSenha(usuario.senha);
    setIsEditing(true); // Ativa o modo de edição ao clicar em Editar
  };  

  const limparCampos = () => {
    setLogin("");
    setNomeCompleto("");
    setEmail("");
    setTelefone("");
    setCpf("");
    setCargo("");
    setDataNascimento("");
    setSenha("");
    setSelectedUserId(null);
    setIsEditing(false); // Desativa o modo de edição ao limpar campos
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
            disabled={isEditing} // Desabilita o botão "Adicionar" se estiver editando
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

        <div className="users-table overflow-auto mb-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Usuário</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="border p-2 text-center">{usuario.usuarioID}</td>
                    <td className="border p-2 text-center">{usuario.usuarioLogin}</td>
                    <td className="border p-2 text-center">{usuario.nomeCompleto}</td>
                    <td className="border p-2 text-center">{usuario.email}</td>
                    <td className="border p-2 text-center">{usuario.status}</td>
                    <td className="border p-2 text-center flex justify-center">
                      <button
                        className="btn btn-edit flex items-center mr-2"
                        style={{ backgroundColor: "yellow" }}
                        onClick={() => editarUsuario(usuario)}
                      >
                        <FaEdit className="mr-2" />
                        Editar
                      </button>
                      <button
                        className="btn btn-delete flex items-center"
                        onClick={() => excluirUsuario(usuario.usuarioID)}
                      >
                        <FaTrash className="mr-2" />
                        {usuario.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                      </button>
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border p-2 text-center">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="users-details mt-8">
          <h3 className="text-lg mb-4">Dados do Usuario</h3>
          <input
            type="text"
            placeholder="Nome Completo"
            className="input-detail mb-4 w-full"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputMask
              mask="99/99/9999"
              placeholder="Data de nascimento"
              className="input-detail"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
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
              placeholder="Email"
              className="input-detail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Usuário"
              className="input-detail"
              value={usuarioLogin}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="input-detail"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="users-actions mt-8 flex justify-between">
            {isEditing ? (
              <>
                <button
                  className="btn btn-update"
                  onClick={atualizarUsuario}
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
                onClick={adicionarUsuario}
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

export default Usuario;
