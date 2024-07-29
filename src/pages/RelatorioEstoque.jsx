// src/pages/InventoryReport.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatorioEstoque.css'; // Importação do CSS para estilos específicos

const RelatorioEstoque = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [supplier, setSupplier] = useState('');
  const [product, setProduct] = useState('');

  const handleGenerateReport = () => {
    // Lógica para gerar relatório com base nos filtros
    console.log('Gerar relatório de entrada de produtos para:', { startDate, endDate, supplier, product });
  };

  return (
    <div className="inventory-report-container min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col items-center justify-center">
      <div className="inventory-report-box bg-white text-black p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-center text-xl font-bold mb-6">Relatório de Entrada de Produtos</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label>Data Inicial</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex flex-col">
              <label>Data Final</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Fornecedor (Opcional)</label>
            <input 
              type="text" 
              placeholder="Nome do Fornecedor" 
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex flex-col">
            <label>Produto (Opcional)</label>
            <input 
              type="text" 
              placeholder="Nome do Produto" 
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={handleGenerateReport} className="btn btn-generate">Gerar</button>
            <button onClick={() => navigate(-1)} className="btn btn-back">Voltar</button>
          </div>
        </div>
      </div>
      <footer className="text-sm mt-4">
        <p>Adegas RV - LTDA SGE 1.0.0</p>
      </footer>
    </div>
  );
};

export default RelatorioEstoque;
