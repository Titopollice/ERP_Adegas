// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaStore,FaUser, FaCartArrowDown, FaDollarSign, FaMoneyBillWave, FaWarehouse, FaFileInvoice, FaFileInvoiceDollar, FaCashRegister } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('cadastros');

  const renderIcons = () => {
    switch (currentSection) {
      case 'cadastros':
        return (
          <div className="flex space-x-16">
            <Link to="/produtos" className="flex flex-col items-center space-y-2">
              <FaBox className="text-6xl" />
              <span>Produtos</span>
            </Link>
            <Link to="/usuario" className="flex flex-col items-center space-y-2">
              <FaUsers className="text-6xl" />
              <span>Usuários</span>
            </Link>
            <Link to="/fornecedor" className="flex flex-col items-center space-y-2">
              <FaStore className="text-6xl" />
              <span>Fornecedor</span>
            </Link>
            <Link to="/cliente" className="flex flex-col items-center space-y-2">
              <FaUser className="text-6xl" />
              <span>Cliente</span>
            </Link>
          </div>
        );
      case 'utilitarios':
        return (
          <div className="flex space-x-16">
            <Link to="/vendas" className="flex flex-col items-center space-y-2">
              <FaCartArrowDown className="text-6xl" />
              <span>Venda</span>
            </Link>
            <Link to="/ContasPagar" className="flex flex-col items-center space-y-2">
              <FaDollarSign className="text-6xl" />
              <span>Gerar A Pagar</span>
            </Link>
            <Link to="/ContasReceber" className="flex flex-col items-center space-y-2">
              <FaMoneyBillWave className="text-6xl" />
              <span>Gerar A Receber</span>
            </Link>
            <Link to="/estoque" className="flex flex-col items-center space-y-2">
              <FaWarehouse className="text-6xl" />
              <span>Entrada de Estoque</span>
            </Link>
          </div>
        );
      case 'relatorios':
        // Exemplos de ícones para Relatórios
        return (
          <div className="flex space-x-16">
            <Link to="/relatorioEstoque" className="flex flex-col items-center space-y-2">
              <FaWarehouse className="text-6xl" />
              <span>Entrada de Estoque</span>
            </Link>
            <Link to="/relatorioVendas" className="flex flex-col items-center space-y-2">
              <FaCashRegister className="text-6xl" />
              <span>Venda Realizada</span>
            </Link>
            <Link to="/relatorioPagar" className="flex flex-col items-center space-y-2">
              <FaFileInvoiceDollar className="text-6xl" />
              <span>A Pagar</span>
            </Link>
            <Link to="/relatorioReceber" className="flex flex-col items-center space-y-2">
              <FaFileInvoice className="text-6xl" />
              <span>A Receber</span>
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-container h-screen w-screen  text-white">
      <header className="home-header flex justify-between items-center p-6 ">
        <h1 className="text-xl font-bold">Adegas SGE</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
        </div>
      </header>

      <nav className="home-nav flex justify-center space-x-8 py-4 border-b border-gray-500">
        <button onClick={() => setCurrentSection('cadastros')} className="hover:underline">Cadastros</button>
        <button onClick={() => setCurrentSection('utilitarios')} className="hover:underline">Utilitários</button>
        <button onClick={() => setCurrentSection('relatorios')} className="hover:underline">Relatórios</button>
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
