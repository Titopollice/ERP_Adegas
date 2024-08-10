import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaStore, FaUser, FaCartArrowDown, FaDollarSign, FaMoneyBillWave, FaWarehouse, FaFileInvoice, FaFileInvoiceDollar, FaCashRegister } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('cadastros');

  const renderIcons = () => {
    const iconClassName = "flex flex-col items-center space-y-4 hover:text-blue-300 transition duration-300 ease-in-out min-w-[150px]";

    switch (currentSection) {
      case 'cadastros':
        return (
          <div className="flex space-x-16">
            <Link to="/produtos" className={iconClassName}>
              <FaBox className="text-7xl" />
              <span className="text-xl">Produtos</span>
            </Link>
            <Link to="/usuario" className={iconClassName}>
              <FaUsers className="text-7xl" />
              <span className="text-xl">Usuários</span>
            </Link>
            <Link to="/fornecedor" className={iconClassName}>
              <FaStore className="text-7xl" />
              <span className="text-xl">Fornecedor</span>
            </Link>
            <Link to="/cliente" className={iconClassName}>
              <FaUser className="text-7xl" />
              <span className="text-xl">Cliente</span>
            </Link>
          </div>
        );
      case 'utilitarios':
        return (
          <div className="flex space-x-16">
            <Link to="/vendas" className={iconClassName}>
              <FaCartArrowDown className="text-7xl" />
              <span className="text-xl">Venda</span>
            </Link>
            <Link to="/ContasPagar" className={iconClassName}>
              <FaDollarSign className="text-7xl" />
              <span className="text-xl">Gerar A Pagar</span>
            </Link>
            <Link to="/ContasReceber" className={iconClassName}>
              <FaMoneyBillWave className="text-7xl" />
              <span className="text-xl">Gerar A Receber</span>
            </Link>
            <Link to="/estoque" className={iconClassName}>
              <FaWarehouse className="text-7xl" />
              <span className="text-xl">Entrada de Estoque</span>
            </Link>
          </div>
        );
      case 'relatorios':
        return (
          <div className="flex space-x-16">
            <Link to="/relatorioEstoque" className={iconClassName}>
              <FaWarehouse className="text-7xl" />
              <span className="text-xl">Entrada de Estoque</span>
            </Link>
            <Link to="/relatorioVendas" className={iconClassName}>
              <FaCashRegister className="text-7xl" />
              <span className="text-xl">Venda Realizada</span>
            </Link>
            <Link to="/relatorioPagar" className={iconClassName}>
              <FaFileInvoiceDollar className="text-7xl" />
              <span className="text-xl">A Pagar</span>
            </Link>
            <Link to="/relatorioReceber" className={iconClassName}>
              <FaFileInvoice className="text-7xl" />
              <span className="text-xl">A Receber</span>
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-container h-screen w-screen text-white">
      <header className="home-header flex justify-between items-center p-6 mb-8">
        <h1 className="text-4xl font-bold">Adegas SGE</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
        </div>
      </header>

      <nav className="home-nav flex justify-center space-x-4 py-6 border-b border-gray-500">
        <button
          onClick={() => setCurrentSection('cadastros')}
          className={`text-2xl px-4 py-2 ${currentSection === 'cadastros' ? 'active' : ''}`}
        >
          Cadastros
        </button>
        <button
          onClick={() => setCurrentSection('utilitarios')}
          className={`text-2xl px-4 py-2 ${currentSection === 'utilitarios' ? 'active' : ''}`}
        >
          Utilitários
        </button>
        <button
          onClick={() => setCurrentSection('relatorios')}
          className={`text-2xl px-4 py-2 ${currentSection === 'relatorios' ? 'active' : ''}`}
        >
          Relatórios
        </button>
      </nav>

      <main className="home-main flex flex-col items-center mt-12 space-y-12">
        {renderIcons()}
      </main>

      <footer className="home-footer flex justify-center items-center mt-12 text-sm">
        <p>Adegas RV - LTDA SGE 1.0.0</p>
      </footer>
    </div>
  );
};

export default Home;
