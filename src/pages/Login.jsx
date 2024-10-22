import React, { useState } from "react";
import axios from "axios";
import ForgotPasswordModal from "./ForgotPasswordModal";
import logo from "../assets/logo.jpg"; // Atualize o caminho da imagem conforme necessário

const Login = () => {
  const [usuarioLogin, setUsuarioLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!usuarioLogin || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
  
    setIsLoading(true);
    setErrorMessage(""); // Limpa a mensagem de erro ao iniciar um novo login
    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuario/login",
        { usuarioLogin, senha }
      );
      const { token, nomeUsuario } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", nomeUsuario);
      localStorage.setItem("userId", response.data.idUsuario); // Nome da chave consistente
      window.location.href = "/home"; // Redireciona para a página inicial
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Credenciais inválidas");
        } else if (error.response.status === 403) {
          setErrorMessage("Usuário inativo. Entre em contato com o suporte.");
        } else {
          setErrorMessage("Erro ao realizar login");
        }
      } else {
        setErrorMessage("Erro ao realizar login");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{ backgroundColor: "#001a33" }} // Cor de fundo personalizada
    >
      <div className="mb-9">
        <img src={logo} alt="Logo" className="h-32 rounded-full" />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="usuarioLogin"
            >
              Usuário
            </label>
            <input
              type="text"
              id="usuarioLogin"
              value={usuarioLogin}
              onChange={(e) => setUsuarioLogin(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading} // Desativa o campo durante o carregamento
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="senha"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading} // Desativa o campo durante o carregamento
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 hover:underline"
          >
            Esqueceu sua senha?
          </button>
        </p>

        <ForgotPasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Login;
