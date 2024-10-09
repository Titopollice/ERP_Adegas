import React, { useState } from "react";
import axios from "axios";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Importe o componente do modal

const Login = () => {
  const [usuarioLogin, setUsuarioLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Envia as credenciais para o backend
      const response = await axios.post(
        "http://localhost:8080/api/usuario/login",
        {
          usuarioLogin,
          senha,
        }
      );

      // Se o login for bem-sucedido, armazene o token JWT
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Redireciona o usuário para outra página (exemplo: dashboard)
      window.location.href = "/";
    } catch (error) {
      // Mostra a mensagem de erro ao usuário
      if (error.response && error.response.status === 401) {
        setErrorMessage("Credenciais inválidas");
      } else {
        setErrorMessage("Erro ao realizar login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          <button
            onClick={() => setIsModalOpen(true)} // Abre o modal ao clicar
            className="text-blue-500 hover:underline"
          >
            Esqueceu sua senha?
          </button>
        </p>
        {/* Modal para recuperação de senha */}
        <ForgotPasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Login;
