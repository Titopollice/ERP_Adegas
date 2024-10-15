import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatorioEstoque.css'; // Importação do CSS para estilos específicos

const RelatorioEstoque = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [supplier, setSupplier] = useState('');
  const [product, setProduct] = useState('');
  const [suppliers, setSuppliers] = useState([]); // Lista de fornecedores
  const [products, setProducts] = useState([]);   // Lista de produtos
  const [report, setReport] = useState([]);       // Relatório gerado, agora como array

  // Função para buscar fornecedores e produtos
  useEffect(() => {
    fetch('http://localhost:8080/api/fornecedor')
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error('Erro ao buscar fornecedores:', error));

    fetch('http://localhost:8080/api/produto')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const handleGenerateReport = () => {
    const params = new URLSearchParams({
      startDate,
      endDate,
      supplier,
      product
    }).toString();

    fetch(`http://localhost:8080/api/relatorio/gerarRelatorio?${params}`)
      .then(response => response.json())
      .then(data => {
        setReport(data); // Armazena o relatório gerado
        console.log('Relatório gerado:', data);
      })
      .catch(error => console.error('Erro ao gerar relatório:', error));
  };

  return (
    <div className="inventory-report-container min-h-screen bg-gradient-to-b text-white flex flex-col items-center justify-center" style={{ backgroundColor: '#001a33' }}>
      <div className="inventory-report-box bg-white text-black p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-center text-xl font-bold mb-6">Relatório de Entrada de Produtos</h1>
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
            <label>Fornecedor (Opcional)</label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="input-field"
            >
              <option value="">Selecione um Fornecedor</option>
              {suppliers.map((fornecedor) => (
                <option key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                  {fornecedor.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Produto (Opcional)</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="input-field"
            >
              <option value="">Selecione um Produto</option>
              {products.map((produto) => (
                <option key={produto.produtoID} value={produto.produtoID}>
                  {produto.nomeProduto}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={handleGenerateReport} className="btn btn-generate">Gerar</button>
            <button onClick={() => navigate(-1)} className="btn btn-back">Voltar</button>
          </div>
        </div>

        {report.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-center text-lg font-semibold">Relatório Gerado:</h2>
            <table className="generated-report-table bg-gray-200 p-4 rounded w-full text-center">
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Data Entrada</th>
                </tr>
              </thead>
              <tbody>
                {report.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.nome}</td>
                    <td>{entry.nomeProduto}</td>
                    <td>{entry.quantidade}</td>
                    <td>{new Date(entry.DataDaMovimentacao).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default RelatorioEstoque;
