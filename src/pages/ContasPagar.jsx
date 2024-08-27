import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaPlus, FaTrash, FaEdit, FaDownload } from "react-icons/fa";
import axios from "axios";
import InputMask from "react-input-mask";
import "./ContasPagar.css";

const ContasPagar = () => {
  const navigate = useNavigate();
  const [contas, setContas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [parcelas, setParcelas] = useState([]);
  const [selectedContaId, setSelectedContaId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("dadosConta");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/contas")
      .then((response) => {
        setContas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar contas:", error);
      });
  }, []);

  const buscarContas = () => {
    axios
      .get(`http://localhost:8080/api/contas?search=${searchTerm}`)
      .then((response) => {
        setContas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar contas:", error);
      });
  };

  const adicionarConta = () => {
    const novaConta = {
      descricao,
      valor,
      dataVencimento,
    };

    axios
      .post("http://localhost:8080/api/contas", novaConta)
      .then((response) => {
        setContas([...contas, response.data]);
        buscarContas();
        limparCampos();
      })
      .catch((error) => {
        console.error("Erro ao adicionar conta:", error);
      });
  };

  const atualizarConta = () => {
    const contaAtualizada = {
      descricao,
      valor,
      dataVencimento,
    };

    axios
      .put(`http://localhost:8080/api/contas/${selectedContaId}`, contaAtualizada)
      .then((response) => {
        setContas(
          contas.map((conta) =>
            conta.contaID === selectedContaId ? response.data : conta
          )
        );
        buscarContas();
        limparCampos();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar conta:", error);
      });
  };

  const excluirConta = (id) => {
    axios
      .delete(`http://localhost:8080/api/contas/${id}`)
      .then(() => {
        setContas((prevContas) =>
          prevContas.filter((conta) => conta.contaID !== id)
        );
        buscarContas();
      })
      .catch((error) => {
        console.error("Erro ao excluir conta:", error);
      });
  };

  const gerarParcelas = (id) => {
    axios
      .post(`http://localhost:8080/api/contas/${id}/parcelas`)
      .then((response) => {
        setParcelas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao gerar parcelas:", error);
      });
  };

  const baixarParcelas = (id) => {
    axios
      .get(`http://localhost:8080/api/contas/${id}/parcelas/download`)
      .then((response) => {
        // Implementar o download do arquivo
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'parcelas.pdf';
        link.click();
      })
      .catch((error) => {
        console.error("Erro ao baixar parcelas:", error);
      });
  };

  const editarConta = (conta) => {
    setSelectedContaId(conta.contaID);
    setDescricao(conta.descricao);
    setValor(conta.valor);
    setDataVencimento(conta.dataVencimento);
    setIsEditing(true);
    setActiveTab("dadosConta"); // Muda para a aba "Dados da Conta" ao editar
  };

  const limparCampos = () => {
    setDescricao("");
    setValor("");
    setDataVencimento("");
    setSelectedContaId(null);
    setIsEditing(false);
  };

  return (
    <div className="contas-container">
      <header className="contas-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Administração de Contas a Pagar</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="text-lg cursor-pointer"
              title="Voltar"
            />
          </div>
        </div>
      </header>

      <div className="contas-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Contas</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="btn btn-add flex items-center"
            onClick={adicionarConta}
            disabled={isEditing}
          >
            <FaPlus className="mr-2" />
            Adicionar
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>

      <main className="contas-main p-6">
        <div className="contas-search flex mb-6">
          <input
            type="text"
            placeholder="Contas"
            className="input-search w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-search ml-4" onClick={buscarContas}>
            <FaSearch />
          </button>
        </div>

        <div className="contas-table overflow-auto mb-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Descrição</th>
                <th className="border p-2">Valor</th>
                <th className="border p-2">Data de Vencimento</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.length > 0 ? (
                contas.map((conta) => (
                  <tr key={conta.contaID}>
                    <td className="border p-2 text-center">{conta.contaID}</td>
                    <td className="border p-2 text-center">{conta.descricao}</td>
                    <td className="border p-2 text-center">{conta.valor}</td>
                    <td className="border p-2 text-center">{conta.dataVencimento}</td>
                    <td className="border p-2 text-center flex justify-center">
                      <button
                        className="btn btn-edit flex items-center mr-2"
                        style={{ backgroundColor: "yellow" }}
                        onClick={() => editarConta(conta)}
                      >
                        <FaEdit className="mr-2" />
                        Editar
                      </button>
                      <button
                        className="btn btn-delete flex items-center"
                        onClick={() => excluirConta(conta.contaID)}
                      >
                        <FaTrash className="mr-2" />
                        Excluir
                      </button>
                      <button
                        className="btn btn-add flex items-center ml-2"
                        onClick={() => gerarParcelas(conta.contaID)}
                      >
                        <FaPlus className="mr-2" />
                        Gerar Parcelas
                      </button>
                      <button
                        className="btn btn-add flex items-center ml-2"
                        onClick={() => baixarParcelas(conta.contaID)}
                      >
                        <FaDownload className="mr-2" />
                        Baixar Parcelas
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border p-2 text-center">
                    Nenhuma conta encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="contas-detalhes">
          <div className="tab-header flex space-x-4">
            <button
              className={`tab-button ${activeTab === "dadosConta" ? "active" : ""}`}
              onClick={() => setActiveTab("dadosConta")}
            >
              Dados da Conta
            </button>
            <button
              className={`tab-button ${activeTab === "gerarParcelas" ? "active" : ""}`}
              onClick={() => setActiveTab("gerarParcelas")}
            >
              Gerar Parcelas
            </button>
          </div>

          {activeTab === "dadosConta" && (
            <div className="dadosConta">
              <h2 className="text-lg">Dados da Conta</h2>
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Valor</label>
                <input
                  type="number"
                  className="form-control"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Data de Vencimento</label>
                <InputMask
                  mask="99/99/9999"
                  className="form-control"
                  value={dataVencimento}
                  onChange={(e) => setDataVencimento(e.target.value)}
                />
              </div>
              {isEditing ? (
                <button className="btn btn-save" onClick={atualizarConta}>
                  Salvar Alterações
                </button>
              ) : (
                <button className="btn btn-save" onClick={adicionarConta}>
                  Adicionar Conta
                </button>
              )}
            </div>
          )}

          {activeTab === "gerarParcelas" && (
            <div className="gerarParcelas">
              <h2 className="text-lg">Gerar Parcelas</h2>
              <p>Funcionalidade para gerar parcelas</p>
              {/* Aqui você pode adicionar mais campos ou opções para configurar a geração de parcelas */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContasPagar;
