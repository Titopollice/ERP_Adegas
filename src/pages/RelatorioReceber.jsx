// src/pages/RelatorioReceber.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatorioReceber.css'; // Importação do CSS para estilos específicos

const RelatorioReceber = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateReport = () => {
    setIsLoading(true);
    setError(null);
    const params = new URLSearchParams({
      startDate,
      endDate,
      status
    }).toString();

    fetch(`http://localhost:8080/api/relatorio/gerarRelatorioReceber?${params}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao gerar relatório');
        }
        return response.json();
      })
      .then(data => {
        setReport(data);
        console.log('Relatório gerado:', data);
      })
      .catch(error => {
        console.error('Erro ao gerar relatório:', error);
        setError('Ocorreu um erro ao gerar o relatório. Por favor, tente novamente.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="receivables-report-container min-h-screen bg-gradient-to-b text-white flex flex-col items-center justify-center" style={{ backgroundColor: '#001a33' }}>
      <div className="receivables-report-box bg-white text-black p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-center text-xl font-bold mb-6">Relatório de Contas a Receber</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <label>Data Inicial</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex flex-col items-center">
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
            <label>Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
            >
              <option value="">Todos</option>
              <option value="Baixada">Baixada</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
          <div className="flex justify-between mt-6">
            <button 
              onClick={handleGenerateReport} 
              className="btn btn-generate"
              disabled={isLoading}
            >
              {isLoading ? 'Gerando...' : 'Gerar'}
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-back">Voltar</button>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-center">{error}</div>
        )}

        {report.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-center text-lg font-semibold">Relatório Gerado:</h2>
            <div className="table-container">
              <table className="generated-report-table bg-gray-200 p-4 rounded w-full text-center">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Data Criação</th>
                    <th>Data Vencimento</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.descricao}</td>
                      <td>{typeof entry.valor === 'number' ? entry.valor.toFixed(2) : entry.valor}</td>
                      <td>{entry.datacriacao ? new Date(entry.datacriacao).toLocaleDateString() : 'N/A'}</td>
                      <td>{entry.vencimento ? new Date(entry.vencimento).toLocaleDateString() : 'N/A'}</td>
                      <td>{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-400">Nenhum relatório disponível.</div>
        )}
      </div>
      <footer className="text-sm mt-4">
        <p>Adegas RV - LTDA SGE 1.0.0</p>
      </footer>
    </div>
  );
};

export default RelatorioReceber;
