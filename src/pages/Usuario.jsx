import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usuario")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
    const loggedInUser = localStorage.getItem("userName"); // Pega do localStorage
    if (loggedInUser) {
      setUserName(loggedInUser); // Define o nome do usuário no estado
    }
  }, []);

  const buscarUsuarios = () => {
    if (searchTerm.trim() === "") {
      axios
        .get("http://localhost:8080/api/usuario")
        .then((response) => {
          setUsuarios(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar fornecedor:", error);
        });
    } else {
      // Se houver termo de pesquisa, busque por nome
      axios
        .get(`http://localhost:8080/api/usuario/nome/${searchTerm}`)
        .then((response) => {
          setUsuarios(response.data);
        })
        .catch((error) => {
          toast.error("Usuario inexsitente!");
          console.error("Erro ao buscar fornecedor pelo nome:", error);
        });
    }
  };

  const formatarData = (data) => {
    // Verifica se a data está no formato DD/MM/AAAA
    const dataSemMascara = data.replace(/[^0-9]/g, "");
    if (dataSemMascara.length === 8) {
      const dia = dataSemMascara.substring(0, 2);
      const mes = dataSemMascara.substring(2, 4);
      const ano = dataSemMascara.substring(4, 8);
      return `${ano}-${mes}-${dia}`; // Formato para salvar no banco
    }
    return data;
  };

  const formatarDataParaInput = (data) => {
    // Converte de AAAA-MM-DD para DD/MM/AAAA para o InputMask
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // Formato DD/MM/AAAA
  };

  const adicionarUsuario1 = () => {
    setIsFieldsDisabled(false);
  };

  const adicionarUsuario = () => {
    setIsFieldsDisabled(false);

    if (!usuarioLogin || !nomeCompleto || !email || !telefone || !cpf || !cargo || !dataNascimento || !senha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    // Primeiro, verificamos se já existe um usuário com o mesmo nome
    axios.get(`http://localhost:8080/api/usuario/nome/${nomeCompleto}`)
      .then((response) => {
        if (response.data.length > 0) {
          // Se encontrou algum usuário, mostra a mensagem de erro
          toast.error("Já existe um usuário com este nome. Por favor, escolha outro nome.");
        } else {
          // Se não encontrou, prossegue com o cadastro
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

          axios.post("http://localhost:8080/api/usuario", novoUsuario)
            .then((response) => {
              setUsuarios([...usuarios, response.data]);
              buscarUsuarios();
              limparCampos();
              setIsFieldsDisabled(true);
              toast.success("Usuário adicionado com sucesso!");
            })
            .catch((error) => {
              console.error("Erro ao adicionar usuário:", error);
              toast.error("Erro ao adicionar usuário. Por favor, tente novamente.");
            });
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar usuário existente:", error);
        toast.error("Erro ao verificar usuário existente. Por favor, tente novamente.");
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
        setIsEditing(false);
        setIsFieldsDisabled(true);
        toast.success("Usuario atualizado com sucesso!"); // Desativa o modo de edição após a atualização
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
        buscarUsuarios(); 7
        toast.success("Status do usuario alterado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao alterar o status do usuário:", error);
        toast.error("Erro ao alterar status do cliente.");
      });

  };

  const editarUsuario = (usuario) => {
    // Preenche os campos com os dados do usuário selecionado
    setSelectedUserId(usuario.usuarioID);
    setLogin(usuario.usuarioLogin);
    setNomeCompleto(usuario.nomeCompleto);
    setEmail(usuario.email);
    setTelefone(usuario.telefone);
    setCpf(usuario.cpf);
    setCargo(usuario.cargo);
    setDataNascimento(usuario.dataNascimento);
    setSenha(usuario.senha);
    setIsEditing(true);
    setIsFieldsDisabled(false); // Habilita os campos ao clicar em Editar
  };

  const limparCampos = (manterHabilitados = false) => {
    setLogin("");
    setNomeCompleto("");
    setEmail("");
    setTelefone("");
    setCpf("");
    setCargo("");
    setDataNascimento("");
    setSenha("");
    setSelectedUserId(null);
    setIsFieldsDisabled(false);

    if (!manterHabilitados) {
      setIsFieldsDisabled(true); // Desabilitar os campos após limpar, exceto se for para manter habilitado
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="users-container">
      <ToastContainer />
      <header className="users-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Usuários</h1>
        <div className="flex items-center space-x-4">
          <div className="relative inline-block text-left">
            <button
              id="dropdownButton"
              onClick={toggleDropdown}
              type="button"
              className="inline-flex items-center space-x-2 bg-white text-sm font-medium text-gray-700 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span>{userName}</span>
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => {
                      localStorage.removeItem("userName");
                    }}
                  >
                    Sair
                  </a>
                </div>
              </div>
            )}
          </div>
          <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
        </div>
      </header>

      <div className="users-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Usuários</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-add flex items-center"
            onClick={adicionarUsuario1}
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
            disabled={isFieldsDisabled} // Desabilita o campo se necessário
          />
          <div className="grid grid-cols-2 gap-4">
            <InputMask
              mask="99/99/9999"
              placeholder="Data de nascimento"
              className="input-detail"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              disabled={isFieldsDisabled} // Desabilita o campo se necessário
            />
            <InputMask
              mask="(99) 99999-9999"
              placeholder="Telefone"
              className="input-detail"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              disabled={isFieldsDisabled} // Desabilita o campo se necessário
            />
            <input
              type="text"
              placeholder="Cargo"
              className="input-detail"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              disabled={isFieldsDisabled} // Desabilita o campo se necessário
            />
            <InputMask
              mask="999.999.999-99"
              placeholder="CPF"
              className="input-detail"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              disabled={isFieldsDisabled} // Desabilita o campo se necessário
            />
            <input
              type="text"
              placeholder="Email"
              className="input-detail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isFieldsDisabled} // Desabilita o campo se necessário
            />
            <input
              type="text"
              placeholder="Usuário"
              className="input-detail"
              value={usuarioLogin}
              onChange={(e) => setLogin(e.target.value)}
              disabled={isFieldsDisabled} // Desabilita o campo se necessário
            />
            <input
              type="password"
              placeholder="Senha"
              className="input-detail"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={isFieldsDisabled} // Desabilita o campo se necessário
            />
          </div>

          <div className="users-actions mt-8 flex justify-between">
            {isEditing ? (
              <>
                <button className="btn btn-update" onClick={atualizarUsuario}>
                  Atualizar
                </button>
                <button className="btn btn-clear flex items-center" onClick={limparCampos}>
                  <FaTrash className="mr-2" />
                  Limpar
                </button>
              </>
            ) : (
              <button className="btn btn-save" onClick={adicionarUsuario}>
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
