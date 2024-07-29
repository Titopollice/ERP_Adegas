// src/pages/AccountsPayableReport.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatorioReceber.css'; // Importação do CSS para estilos específicos

const RelatorioPagar = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [client, setClient] = useState('');
  const [bank, setBank] = useState('');

  const handleGenerateReport = () => {
    // Lógica para gerar relatório com base nos filtros
    console.log('Gerar relatório de contas a pagar para:', { startDate, endDate, client, bank });
  };

  return (
    <div className="accounts-payable-report-container min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col items-center justify-center">
      <div className="accounts-payable-report-box bg-white text-black p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-center text-xl font-bold mb-6">Relatório de Contas a Receber</h1>
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
            <label>Cliente (Opcional)</label>
            <input 
              type="text" 
              placeholder="Nome do Cliente" 
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex flex-col">
            <label>Banco (Opcional)</label>
            <input 
              type="text" 
              placeholder="Nome do Banco" 
              value={bank}
              onChange={(e) => setBank(e.target.value)}
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

export default RelatorioPagar;
