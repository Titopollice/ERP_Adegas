import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Importa os componentes do Toastify
import 'react-toastify/dist/ReactToastify.css';
import './ContasReceber.css';

const ContasReceber = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('conta'); // Aba ativa
  const [contas, setContas] = useState([]);
  const [parcelas, setParcelas] = useState([]);
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [descricaoConta, setDescricaoConta] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [statusConta, setStatusConta] = useState('Pendente');
  const [dataVencimento, setDataVencimento] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userName");
    if (loggedInUser) {
      setUserName(loggedInUser);
    }

    // Carrega as contas existentes ao montar o componente
    fetchContas();
  }, []);

  const fetchContas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/receber');
      const data = await response.json();
      setContas(data);
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
      toast.error('Erro ao buscar contas.'); 
    }
  };

  const gerarParcelas = () => {
    if (!valorTotal || !dataVencimento || numeroParcelas < 1) {
      toast.warn('Por favor, preencha todos os campos corretamente.'); // Notificação de alerta
      return;
    }

    const parcelasGeradas = [];
    const valorParcela = parseFloat(valorTotal) / numeroParcelas;

    for (let i = 0; i < numeroParcelas; i++) {
      const vencimentoParcela = new Date(dataVencimento);
      vencimentoParcela.setMonth(vencimentoParcela.getMonth() + i);

      parcelasGeradas.push({
        numero: i + 1,
        descricao: `Parcela ${i + 1} de ${numeroParcelas}`,
        valor: valorParcela.toFixed(2),
        vencimento: vencimentoParcela.toISOString().split('T')[0],
        status: 'Pendente',
        data_baixa: null,
      });
    }

    setParcelas(parcelasGeradas);
    setActiveTab('parcelas');
    toast.success('Parcelas geradas com sucesso!');
  };


  const salvarContaPagar = async () => {
    try {
      const contaPagar = {
        descricao: descricaoConta,
        valor: valorTotal,
        datacriacao: new Date().toISOString().split('T')[0],// Formato ISO para backend
        status: statusConta,
        dataVencimento, // Inclui data de vencimento
        parcelas // Envia as parcelas geradas
      };

      // Salvando a conta a pagar com as parcelas
      const respostaConta = await fetch('http://localhost:8080/api/receber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contaPagar),
      });

      if (!respostaConta.ok) {
        throw new Error('Erro ao salvar a conta a pagar');
      }

      toast.success('Conta a pagar e parcelas salvas com sucesso!');
      fetchContas(); // Recarrega as contas após salvar
      setParcelas([]); // Limpa as parcelas após salvar a conta
      limparCampos(); // Limpa os campos da conta
      setActiveTab('conta'); // Retorna para a aba de contas após salvar
    } catch (error) {
      console.error('Erro ao salvar a conta a receber:', error);
      toast.error('Erro ao salvar a conta a receber.');
    }
  };

  // Função para limpar os campos da conta
  const limparCampos = () => {
    setDescricaoConta('');
    setValorTotal('');
    setStatusConta('Pendente');
    setDataVencimento('');
    setNumeroParcelas(1);
    setParcelas([]); // Limpa as parcelas também
  };

  // Função para excluir uma conta
  const handleDelete = async (contaID) => {
    if (window.confirm("Tem certeza que deseja excluir essa conta?")) {
      try {
        await fetch(`http://localhost:8080/api/receber/${contaID}`, {
          method: 'DELETE',
        });
        toast.success("Conta excluída com sucesso!");
        fetchContas(); // Recarrega as contas após exclusão
      } catch (error) {
        console.error("Erro ao excluir a conta:", error);
        toast.error("Erro ao excluir a conta."); 
      }
    }
  };

  const handleBaixaParcela = async (parcelaID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/receber/parcelas/${parcelaID}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Baixada',
          data_baixa: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        // Atualiza o status da parcela localmente no estado
        const novasParcelas = parcelas.map(parcela => {
          if (parcela.parcelaID === parcelaID) {
            return { ...parcela, status: 'Baixada', data_baixa: new Date().toISOString().split('T')[0] };
          }
          return parcela;
        });
        setParcelas(novasParcelas);
        toast.success('Parcela baixada com sucesso!');
      } else {
        console.error('Erro ao atualizar o status da parcela:', await response.text());
        toast.error('Erro ao atualizar o status da parcela.');
      }
    } catch (error) {
      console.error('Erro ao dar baixa na parcela:', error);
      toast.error('Erro ao dar baixa na parcela.');
    }
  };

  // Função para dar baixa e buscar as parcelas vinculadas
  const handleBaixa = async (contaID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/receber/${contaID}/parcelas`);

      // Verifica se a resposta não é ok
      if (!response.ok) {
        const errorText = await response.text(); // Obter o texto da resposta de erro
        throw new Error(`Erro ao buscar parcelas da conta: ${errorText}`);
      }

      const data = await response.json();
      setParcelas(data);
      setActiveTab('parcelas');
    } catch (error) {
      console.error('Erro ao dar baixa:', error);
      toast.error('Erro ao dar baixa nas parcelas.');
    }
  };


  return (
    <div className="accounts-payable-container">
      <ToastContainer />
      <header className="accounts-payable-header flex justify-between items-center p-9">
        <h1 className="text-xl font-bold">Contas a Receber</h1>
        <div className="flex items-center space-x-4">
          <span className="text-white-800">{userName}</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <main className="accounts-payable-main p-6">
        {/* Tabela de Contas */}
        <h3 className="text-lg mb-4">Lista de Contas a Receber</h3>
        <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="w-full border-collapse">
            <thead className="table-header">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Descrição</th>
                <th className="border p-2">Valor</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta) => (
                <tr key={conta.contaID} className="table-row">
                  <td className="border p-2">{conta.contaID}</td>
                  <td className="border p-2">{conta.descricao}</td>
                  <td className="border p-2">R$ {conta.valor}</td>
                  <td className="border p-2">{conta.status}</td>
                  <td className="border p-2 table-actions">
                    <button className="btn-action" onClick={() => handleBaixa(conta.contaID)}>Dar Baixa</button>
                    <button className="btn-action text-red-500" onClick={() => handleDelete(conta.contaID)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tabs-container mt-8">
          <button
            className={`tab-button ${activeTab === 'conta' ? 'active' : ''}`}
            onClick={() => setActiveTab('conta')}
          >
            Conta
          </button>
          <button
            className={`tab-button ${activeTab === 'parcelas' ? 'active' : ''}`}
            onClick={() => setActiveTab('parcelas')}
          >
            Parcelas
          </button>
        </div>

        {/* Detalhes para nova conta */}
        {activeTab === 'conta' && (
          <div className="accounts-payable-details mt-8">
            <h3 className="text-lg mb-4">Nova Conta a Pagar</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Descrição da Conta"
                className="input-detail"
                value={descricaoConta}
                onChange={(e) => setDescricaoConta(e.target.value)}
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
                placeholder="Data de Vencimento"
                className="input-detail"
                value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)}
              />
              <input
                type="number"
                placeholder="Número de Parcelas"
                className="input-detail"
                value={numeroParcelas}
                onChange={(e) => setNumeroParcelas(e.target.value)}
              />
            </div>
            <div className="button-container">
            <button className="btn-save mt-4" onClick={gerarParcelas}>Gerar Parcelas</button>
            <button className="btn-clear mt-4" onClick={limparCampos}>Limpar</button>
            </div>
           

          </div>
        )}

        {/* Detalhes das Parcelas */}
        {activeTab === 'parcelas' && (
          <div className="accounts-payable-parcelas mt-8">
            <h3 className="text-lg mb-4">Parcelas Geradas</h3>
            <table className="w-full border-collapse">
              <thead className="table-header" >
                <tr>
                  <th className="border p-2">Número</th>
                  <th className="border p-2">Descrição</th>
                  <th className="border p-2">Valor</th>
                  <th className="border p-2">Vencimento</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2"></th>
                </tr>
              </thead>
              <tbody>
                {parcelas.map((parcela) => (
                  <tr key={parcela.numero} className="table-row">
                    <td className="border p-2">{parcela.numero}</td>
                    <td className="border p-2">{parcela.descricao}</td>
                    <td className="border p-2">R$ {parcela.valor}</td>
                    <td className="border p-2">{new Date(parcela.vencimento).toLocaleDateString('pt-BR')}</td>
                    <td className="border p-2">{parcela.status}</td>
                    <td className="border p-2">
                      {parcela.status === 'Pendente' && (
                        <button
                          className="btn-action"
                          onClick={() => handleBaixaParcela(parcela.parcelaID)}
                        >
                          Dar Baixa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="button-container">
              <button className="btn-save" onClick={salvarContaPagar}>Salvar Conta</button>
              <button className="btn-clear" onClick={limparCampos}>Limpar</button>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContasReceber;
