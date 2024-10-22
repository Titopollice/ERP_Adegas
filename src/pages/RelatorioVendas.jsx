// src/pages/RelatorioVendas.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatorioVendas.css';

const RelatorioVendas = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [report, setReport] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/usuario')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar funcionários:', error));
  }, []);

  const handleGenerateReport = () => {
    setIsLoading(true);
    setError(null);
    const params = new URLSearchParams({
      startDate,
      endDate,
      ...(employeeId && { employeeId })
    }).toString();

    console.log('Parâmetros enviados:', params);

    fetch(`http://localhost:8080/api/relatorio/gerarRelatorioVenda?${params}`)
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
    <div className="sales-report-container min-h-screen bg-gradient-to-b text-white flex flex-col items-center justify-center" style={{ backgroundColor: '#001a33' }}>
      <div className="sales-report-box bg-white text-black p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-center text-xl font-bold mb-6">Relatório de Venda Realizada</h1>
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
            <label>Funcionário (Opcional)</label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="input-field"
            >
              <option value="">Todos os Funcionários</option>
              {users.map((usuario) => (
                <option key={usuario.usuarioID} value={usuario.usuarioID}>
                  {usuario.nomeCompleto}
                </option>
              ))}
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
                    <th>Data da Venda</th>
                    <th>Funcionário</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.dataVenda ? new Date(entry.dataVenda).toLocaleDateString() : 'N/A'}</td>
                      <td>{entry.nomeUsuario}</td>
                      <td>{entry.produtosVendidos}</td>
                      <td>{entry.quantidade}</td>
                      <td>{typeof entry.totalVenda === 'number' ? entry.totalVenda.toFixed(2) : entry.totalVenda}</td>
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

export default RelatorioVendas;
