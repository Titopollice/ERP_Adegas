// src/pages/AccountsReceivable.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaPlus, FaTrash, FaCheck, FaSave } from 'react-icons/fa';
import './ContasReceber.css'; // Importação do CSS padrão para estilos

const ContasReceber = () => {
  const navigate = useNavigate();

  return (
    <div className="accounts-receivable-container">
      <header className="accounts-receivable-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Contas a Receber</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <div className="accounts-receivable-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Contas a Receber</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn btn-add flex items-center">
            <FaPlus className="mr-2" />
            Novo
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>

      <main className="accounts-receivable-main p-6">
        <div className="accounts-receivable-search flex mb-6">
          <input type="text" placeholder="Contas a Receber" className="input-search w-full" />
          <button className="btn btn-search ml-4">
            <FaSearch />
          </button>
        </div>

        <div className="accounts-receivable-table overflow-auto mb-6">
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

        <div className="accounts-receivable-details mt-8">
          <h3 className="text-lg mb-4">Descrição</h3>
          <input type="text" placeholder="Descrição" className="input-detail mb-4 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Banco" className="input-detail" />
            <input type="text" placeholder="Nº de parcelas" className="input-detail" />
            <input type="text" placeholder="Valor da parcela" className="input-detail" />
            <input type="text" placeholder="Data de Cadastro" className="input-detail" />
            <input type="text" placeholder="Data da Baixa" className="input-detail" />
          </div>
        </div>

        <div className="accounts-receivable-actions mt-8 flex justify-between">
          <button className="btn btn-delete flex items-center">
            <FaTrash className="mr-2" />
            Excluir
          </button>
          <div className="flex space-x-4">
            <button className="btn btn-check flex items-center">
              <FaCheck className="mr-2" />
              Dar Baixa
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

export default ContasReceber;
