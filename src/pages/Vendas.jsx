// src/pages/Sales.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaTrash, FaTag, FaCheck } from 'react-icons/fa';
import './Vendas.css'; // Importação do CSS padrão para estilos

const Vendas = () => {
  const navigate = useNavigate();

  return (
    <div className="sales-container">
      <header className="sales-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Vendas</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <div className="sales-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Informe o produto</h2>
        </div>
      </div>

      <main className="sales-main p-6">
        <div className="sales-search flex mb-6">
          <input type="text" placeholder="Produto" className="input-search w-full" />
          <button className="btn btn-search ml-4">
            <FaSearch />
          </button>
        </div>

        <div className="sales-info-grid mb-6">
          <div className="sales-info-item">Quantidade</div>
          <div className="sales-info-item">Valor Unit.</div>
          <div className="sales-info-item">Desc.%</div>
          <div className="sales-info-item">Desc.R$</div>
          <div className="sales-info-item">Valor Total</div>

          <input type="number" className="sales-info-item" defaultValue={0} />
          <input type="number" className="sales-info-item" defaultValue={0.00} />
          <input type="number" className="sales-info-item" defaultValue={0} />
          <input type="number" className="sales-info-item" defaultValue={0.00} />
          <input type="number" className="sales-info-item" defaultValue={0.00} />
        </div>


        <div className="sales-summary mb-6">
          <h3 className="text-lg">Valor da Compra: <span className="text-red-500">0,00</span></h3>
        </div>

        <div className="sales-table overflow-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Produto</th>
                <th className="border p-2">Quantidade</th>
                <th className="border p-2">Valor Total</th>
                <th className="border p-2">Nota Fiscal</th>
              </tr>
            </thead>
            <tbody>
              {/* Linhas de dados */}
            </tbody>
          </table>
        </div>

        <footer className="sales-footer mt-8">
          <div className="sales-actions flex space-x-4">
          <button className="btn btn-delete">
            <FaTrash className="mr-2" />
            Deletar Item
          </button>
          <button className="btn btn-discount">
            <FaTag className="mr-2" />
            Desconto
          </button>
          <button className="btn btn-finalize">
            <FaCheck className="mr-2" />
            Finalizar
          </button>
        </div>
        </footer>
        
      </main>
    </div>
  );
};

export default Vendas;
