  // src/pages/Login.jsx
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';  // Alterado de useHistory para useNavigate
  import logo from '../assets/logo.jpg';

  const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Alterado de history para navigate

    const handleLogin = (e) => {
      e.preventDefault();
      // Lógica de autenticação
      console.log('Username:', username, 'Password:', password);
      // Simulando login bem-sucedido
      navigate('/');  // Alterado de history.push('/') para navigate('/')
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-blue-900 to-blue-900">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-24 mb-4 rounded" />
          <h1 className="text-3xl font-semibold text-white">Adegas SG</h1>
        </div>
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nome de usuário
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
              Esqueceu a senha?
            </a>
          </div>
        </form>
        <div className="mt-8 text-center text-white">
          <p>Direitos e Avisos</p>
          <p>1.00.00.00</p>
        </div>
      </div>
    );
  };

  export default Login;

