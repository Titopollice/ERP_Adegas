// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import Vendas from "./pages/Vendas";
import Usuario from "./pages/Usuario";
import Fornecedor from "./pages/Fornecedor";
import ContasReceber from "./pages/ContasReceber";
import ContasPagar from "./pages/ContasPagar";
import Estoque from "./pages/Estoque";
import RelatorioVendas from "./pages/RelatorioVendas";
import RelatorioPagar from "./pages/RelatorioPagar";
import RelatorioEstoque from "./pages/RelatorioEstoque";
import RelatorioReceber from "./pages/RelatorioReceber";
import Cliente from "./pages/Cliente";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from './pages/ProtectedRoute'; // Importe o componente de rota protegida

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Home" element={<Home />} />
    
    {/* Rota protegida para Vendas */}
    <Route
      path="/vendas"
      element={
        <ProtectedRoute>
          <Vendas />
        </ProtectedRoute>
      }
    />
    
    {/* Outras rotas que precisam ser protegidas */}
    <Route
      path="/produtos"
      element={
        <ProtectedRoute>
          <Produtos />
        </ProtectedRoute>
      }
    />
    <Route
      path="/usuario"
      element={
        <ProtectedRoute>
          <Usuario />
        </ProtectedRoute>
      }
    />
    <Route
      path="/fornecedor"
      element={
        <ProtectedRoute>
          <Fornecedor />
        </ProtectedRoute>
      }
    />
    <Route
      path="/contasReceber"
      element={
        <ProtectedRoute>
          <ContasReceber />
        </ProtectedRoute>
      }
    />
    <Route
      path="/ContasPagar"
      element={
        <ProtectedRoute>
          <ContasPagar />
        </ProtectedRoute>
      }
    />
    <Route
      path="/estoque"
      element={
        <ProtectedRoute>
          <Estoque />
        </ProtectedRoute>
      }
    />
    <Route
      path="/relatorioVendas"
      element={
        <ProtectedRoute>
          <RelatorioVendas />
        </ProtectedRoute>
      }
    />
    <Route
      path="/relatorioPagar"
      element={
        <ProtectedRoute>
          <RelatorioPagar />
        </ProtectedRoute>
      }
    />
    <Route
      path="/relatorioEstoque"
      element={
        <ProtectedRoute>
          <RelatorioEstoque />
        </ProtectedRoute>
      }
    />
    <Route
      path="/relatorioReceber"
      element={
        <ProtectedRoute>
          <RelatorioReceber />
        </ProtectedRoute>
      }
    />
    
    {/* Rotas não protegidas */}
    <Route path="/cliente" element={<Cliente />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
  </Routes>
);

export default AppRoutes;
