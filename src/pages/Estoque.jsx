// src/pages/ProductEntry.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaPlus } from 'react-icons/fa';
import './Estoque.css'; // Importação do CSS padrão para estilos

const Estoque = () => {
  const navigate = useNavigate();

  return (
    <div className="product-entry-container">
      <header className="product-entry-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Entrada de Produtos</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <div className="product-entry-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Entrada de Produtos</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn btn-manual flex items-center">
            Entrada Manual
          </button>
          <button className="btn btn-xml flex items-center">
            Entrada via XML
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>

      <main className="product-entry-main p-6">
        <div className="product-entry-search flex mb-6">
          <input type="text" placeholder="Entrada" className="input-search w-full" />
          <button className="btn btn-search ml-4">
            <FaSearch />
          </button>
        </div>

        <div className="product-entry-table overflow-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Produto</th>
                <th className="border p-2">Lote</th>
                <th className="border p-2">Data da Entrada</th>
                <th className="border p-2">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {/* Linhas de dados */}
            </tbody>
          </table>
        </div>

        <div className="product-entry-details mt-8">
          <h3 className="text-lg mb-4">Fornecedor</h3>
          <input type="text" placeholder="Fornecedor" className="input-detail mb-4 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Data de entrada" className="input-detail" />
            <input type="text" placeholder="Quantidade de Produtos" className="input-detail" />
          </div>
        </div>

        <div className="product-entry-actions mt-8 flex justify-between">
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
          <button className="btn btn-save">
            Salvar
          </button>
        </div>
      </main>
    </div>
  );
};

export default Estoque;
