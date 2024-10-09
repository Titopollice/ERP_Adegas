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
import ResetPassword from "./pages/ResetPassword"; // Importe o componente de redefinição
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/vendas" element={<Vendas />} />
    <Route path="/produtos" element={<Produtos />} />
    <Route path="/usuario" element={<Usuario />} />
    <Route path="/fornecedor" element={<Fornecedor />} />
    <Route path="/contasReceber" element={<ContasReceber />} />
    <Route path="/ContasPagar" element={<ContasPagar />} />
    <Route path="/estoque" element={<Estoque />} />
    <Route path="/relatorioVendas" element={<RelatorioVendas />} />
    <Route path="/relatorioPagar" element={<RelatorioPagar />} />
    <Route path="/relatorioEstoque" element={<RelatorioEstoque />} />
    <Route path="/relatorioReceber" element={<RelatorioReceber />} />
    <Route path="/cliente" element={<Cliente />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
  </Routes>
);

export default AppRoutes;
