// src/pages/Suppliers.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaPlus, FaTrash } from 'react-icons/fa';
import './Fornecedor.css'; // Importação do CSS padrão para estilos

const Fornecedor = () => {
  const navigate = useNavigate();

  return (
    <div className="suppliers-container">
      <header className="suppliers-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Fornecedores</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <div className="suppliers-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Fornecedores</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn btn-add flex items-center">
            <FaPlus className="mr-2" />
            Adicionar
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>

      <main className="suppliers-main p-6">
        <div className="suppliers-search flex mb-6">
          <input type="text" placeholder="Fornecedores" className="input-search w-full" />
          <button className="btn btn-search ml-4">
            <FaSearch />
          </button>
        </div>

        <div className="suppliers-table overflow-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Fornecedor</th>
                <th className="border p-2">CNPJ</th>
                <th className="border p-2">Razão Social</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Linhas de dados */}
            </tbody>
          </table>
        </div>

        <div className="suppliers-details mt-8">
          <h3 className="text-lg mb-4">Nome Fantasia</h3>
          <input type="text" placeholder="Nome Fantasia" className="input-detail mb-4 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="CNPJ" className="input-detail" />
            <input type="text" placeholder="Razão Social" className="input-detail" />
            <input type="text" placeholder="Número" className="input-detail" />
            <input type="text" placeholder="Bairro" className="input-detail" />
            <input type="text" placeholder="Complemento" className="input-detail" />
            <input type="text" placeholder="Telefone" className="input-detail" />
            <input type="text" placeholder="Email" className="input-detail" />
          </div>
        </div>

        <div className="suppliers-actions mt-8 flex justify-between">
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

export default Fornecedor;
