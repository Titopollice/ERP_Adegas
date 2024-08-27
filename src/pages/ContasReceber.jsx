import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaPlus, FaSave } from 'react-icons/fa';
import axios from 'axios';
import './ContasPagar.css';

const ContasPagar = () => {
  const navigate = useNavigate();
  const [parcelas, setParcelas] = useState([]);
  const [valorTotal, setValorTotal] = useState('');
  const [numeroParcelas, setNumeroParcelas] = useState('');
  const [descricao, setDescricao] = useState('');
  const [notaFiscal, setNotaFiscal] = useState('');
  const [contas, setContas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/contas')
      .then(response => setContas(response.data))
      .catch(error => console.error('Erro ao buscar contas:', error));
  }, []);

  const gerarParcelas = () => {
    const parcelasGeradas = [];
    const valorParcela = valorTotal / numeroParcelas;

    for (let i = 1; i <= numeroParcelas; i++) {
      parcelasGeradas.push({
        id: i, // Este é um ID fictício para exemplificar. Ajuste conforme necessário.
        numero: i,
        valor: valorParcela.toFixed(2),
        vencimento: '',
        status: 'Pendente',
        dataBaixa: ''
      });
    }
    setParcelas(parcelasGeradas);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleBaixarParcela = (index) => {
    const parcelaAtualizada = {
      ...parcelas[index],
      status: 'Pago',
      data_baixa: new Date().toISOString().slice(0, 10), // Formato YYYY-MM-DD
    };

    axios
      .put(`http://localhost:8080/api/parcelas/${parcelas[index].id}/status`, parcelaAtualizada)
      .then(() => {
        const newParcelas = parcelas.map((parcela, i) =>
          i === index ? parcelaAtualizada : parcela
        );
        setParcelas(newParcelas);
      })
      .catch(error => console.error('Erro ao atualizar parcela:', error));
  };

  const handleSave = () => {
    const novaConta = {
      descricao,
      valortotal: valorTotal,
      datacriacao: new Date().toISOString().slice(0, 10),
      status: 'Ativo',  // Assuming 'Ativo' is the default status
      notafiscal: notaFiscal,
      parcelas: parcelas
    };

    axios
      .post('http://localhost:8080/api/contas', novaConta)
      .then(response => {
        console.log('Conta salva com sucesso:', response.data);
        navigate('/contas'); // Redirecionar para a página de listagem de contas
      })
      .catch(error => console.error('Erro ao salvar conta:', error));
  };

  return (
    <div className="accounts-payable-container">
      {/* Rest of the component structure remains the same */}
    </div>
  );
};

export default ContasPagar;
