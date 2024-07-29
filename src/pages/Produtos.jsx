// src/pages/Products.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaUserCircle } from 'react-icons/fa';
import './Produtos.css'; // Importação do CSS padrão

const Produtos = () => {
  const navigate = useNavigate();

  return (
    <div className="products-container">
      <header className="products-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Estoque</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
            <FaUserCircle className="text-lg" />
          </div>
        </div>
      </header>

      <div className="products-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Estoque</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn btn-add flex items-center">
            <FaPlus className="mr-2" />
            Adicionar
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>

      <main className="products-main p-6">
        <div className="products-search flex mb-6">
          <input type="text" placeholder="Produto" className="input-search w-full" />
          <button className="btn btn-search ml-4">Buscar</button>
        </div>

        <div className="products-table overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Produto</th>
                <th className="border p-2">Fornecedor</th>
                <th className="border p-2">Quantidade</th>
                <th className="border p-2">Nota Fiscal</th>
              </tr>
            </thead>
            <tbody>
              {/* Linhas de dados */}
            </tbody>
          </table>
        </div>

        <div className="products-details mt-8">
          <h3 className="text-lg mb-4">Nome do Produto</h3>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Medida" className="input-detail" />
            <input type="text" placeholder="Valor de Custo" className="input-detail" />
            <input type="text" placeholder="% Lucro" className="input-detail" />
            <input type="text" placeholder="Valor de Venda" className="input-detail" />
            <input type="text" placeholder="Categoria" className="input-detail" />
            <input type="text" placeholder="Quantidade Atual" className="input-detail" />
            <input type="text" placeholder="Marca" className="input-detail" />
            <input type="text" placeholder="Ano do Vinho" className="input-detail" />
          </div>
        </div>
      </main>

      <footer className="products-footer flex justify-between p-6">
        <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        <div className="flex space-x-4">
          <button className="btn btn-delete">Excluir</button>
          <button className="btn btn-save">Salvar</button>
        </div>
      </footer>
    </div>
  );
};

export default Produtos;
