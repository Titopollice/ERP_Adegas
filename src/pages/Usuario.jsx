// src/pages/Users.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaPlus, FaTrash } from 'react-icons/fa';
import './Usuario.css'; // Importação do CSS padrão para estilos

const Usuario = () => {
  const navigate = useNavigate();

  return (
    <div className="users-container">
      <header className="users-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Administração de Sistema</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <div className="users-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Usuários</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn btn-add flex items-center">
            <FaPlus className="mr-2" />
            Adicionar
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>

      <main className="users-main p-6">
        <div className="users-search flex mb-6">
          <input type="text" placeholder="Usuários" className="input-search w-full" />
          <button className="btn btn-search ml-4">
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
              </tr>
            </thead>
            <tbody>
              {/* Linhas de dados */}
            </tbody>
          </table>
        </div>

        <div className="users-details mt-8">
          <h3 className="text-lg mb-4">Nome Completo</h3>
          <input type="text" placeholder="Nome Completo" className="input-detail mb-4 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Data de nascimento" className="input-detail" />
            <input type="text" placeholder="Cargo" className="input-detail" />
            <input type="text" placeholder="CPF" className="input-detail" />
            <input type="text" placeholder="Usuário" className="input-detail" />
            <input type="text" placeholder="Telefone" className="input-detail" />
            <input type="text" placeholder="Email" className="input-detail" />
            <input type="password" placeholder="Senha" className="input-detail" />
          </div>
        </div>

        <div className="users-actions mt-8 flex justify-between">
          <button className="btn btn-delete flex items-center">
            <FaTrash className="mr-2" />
            Excluir
          </button>
          <button className="btn btn-save">
            Salvar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Usuario;
