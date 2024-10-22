import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaUsers,
  FaStore,
  FaUser,
  FaCartArrowDown,
  FaDollarSign,
  FaMoneyBillWave,
  FaWarehouse,
  FaFileInvoice,
  FaFileInvoiceDollar,
  FaCashRegister,
} from "react-icons/fa";
import "./Home.css";
import avatarImage from "../assets/avatarImage.jpg"; // Importa a imagem

const Home = () => {
  const [currentSection, setCurrentSection] = useState("cadastros");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(""); // Estado para o nome do usuário

  // Pega o nome do usuário do localStorage quando o componente monta
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userName"); // Pega do localStorage
    if (loggedInUser) {
      setUserName(loggedInUser); // Define o nome do usuário no estado
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest("#dropdownButton")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderIcons = () => {
    const iconClassName =
      "flex flex-col items-center space-y-4 hover:text-blue-300 transition duration-300 ease-in-out min-w-[150px]";

    switch (currentSection) {
      case "cadastros":
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
      case "utilitarios":
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
      case "relatorios":
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
        <div className="relative inline-block text-left">
          <button
            id="dropdownButton"
            onClick={toggleDropdown}
            type="button"
            className="inline-flex items-center space-x-2 bg- text-sm font-medium text-white-700 px-4 py-2 border border-gray-300 rounded-md border-transparent shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="text-whrite-800">{userName}</span> {/* Removido o bold aqui */}
            <svg
              className="h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => {
                    localStorage.removeItem("userName"); // Remove o nome do usuário do localStorage
                  }}
                >
                  Sair
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <nav className="home-nav flex justify-center space-x-4 py-6 border-b border-gray-500">
        <button
          onClick={() => setCurrentSection("cadastros")}
          className={`text-2xl px-4 py-2 ${currentSection === "cadastros" ? "active" : ""
            }`}
        >
          Cadastros
        </button>
        <button
          onClick={() => setCurrentSection("utilitarios")}
          className={`text-2xl px-4 py-2 ${currentSection === "utilitarios" ? "active" : ""
            }`}
        >
          Utilitários
        </button>
        <button
          onClick={() => setCurrentSection("relatorios")}
          className={`text-2xl px-4 py-2 ${currentSection === "relatorios" ? "active" : ""
            }`}
        >
          Relatórios
        </button>
      </nav>

      <main className="home-content flex justify-center items-center mt-20">
        {renderIcons()}
      </main>
    </div>
  );
};

export default Home;