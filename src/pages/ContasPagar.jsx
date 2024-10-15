import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaPlus, FaTrash, FaCheck, FaSave } from 'react-icons/fa';
import './ContasPagar.css';

const ContasPagar = () => {
  const navigate = useNavigate();
  const [parcelas, setParcelas] = useState([]);
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [valorTotal, setValorTotal] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');

  // Função para gerar as parcelas
  const gerarParcelas = () => {
    const parcelasGeradas = [];
    const valorParcela = parseFloat(valorTotal) / numeroParcelas;
    
    for (let i = 0; i < numeroParcelas; i++) {
      const vencimentoParcela = new Date(dataVencimento);
      vencimentoParcela.setMonth(vencimentoParcela.getMonth() + i);
      
      parcelasGeradas.push({
        numero: i + 1,
        valor: valorParcela.toFixed(2),
        vencimento: vencimentoParcela.toLocaleDateString(),
      });
    }
    
    setParcelas(parcelasGeradas);
  };

  return (
    <div className="accounts-payable-container">
      <header className="accounts-payable-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Contas a Pagar</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <div className="accounts-payable-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Contas a Pagar</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn btn-add flex items-center">
            <FaPlus className="mr-2" />
            Novo
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>

      <main className="accounts-payable-main p-6">
        <div className="accounts-payable-search flex mb-6">
          <input type="text" placeholder="Contas a Pagar" className="input-search w-full" />
          <button className="btn btn-search ml-4">
            <FaSearch />
          </button>
        </div>

        <div className="accounts-payable-table overflow-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Título</th>
                <th className="border p-2">Valor</th>
                <th className="border p-2">Vencimento</th>
                <th className="border p-2">Nota Fiscal</th>
              </tr>
            </thead>
            <tbody>
              {/* Linhas de dados */}
            </tbody>
          </table>
        </div>

        <div className="accounts-payable-details mt-8">
          <h3 className="text-lg mb-4">Gerar Parcelas</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Nº de parcelas"
              className="input-detail"
              value={numeroParcelas}
              onChange={(e) => setNumeroParcelas(e.target.value)}
            />
            <input
              type="text"
              placeholder="Valor Total"
              className="input-detail"
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
            />
            <input
              type="date"
              placeholder="Data de Vencimento Inicial"
              className="input-detail"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
            />
          </div>

          <button className="btn btn-add mt-4" onClick={gerarParcelas}>
            Gerar Parcelas
          </button>

          {parcelas.length > 0 && (
            <div className="parcelas-geradas mt-8">
              <h3 className="text-lg mb-4">Parcelas Geradas</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Parcela</th>
                    <th className="border p-2">Valor</th>
                    <th className="border p-2">Vencimento</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelas.map((parcela, index) => (
                    <tr key={index}>
                      <td className="border p-2">{parcela.numero}</td>
                      <td className="border p-2">R$ {parcela.valor}</td>
                      <td className="border p-2">{parcela.vencimento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="accounts-payable-actions mt-8 flex justify-between">
          <button className="btn btn-delete flex items-center">
            <FaTrash className="mr-2" />
            Excluir
          </button>
          <div className="flex space-x-4">
            <button className="btn btn-check flex items-center">
              <FaCheck className="mr-2" />
              Pagar
            </button>
            <button className="btn btn-save flex items-center">
              <FaSave className="mr-2" />
              Salvar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContasPagar;
