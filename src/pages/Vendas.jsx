  import React, { useState,useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { FaArrowLeft, FaSearch, FaTrash, FaCheck } from 'react-icons/fa';
  import axios from 'axios';
  import './Vendas.css';

  const Vendas = () => {
    const navigate = useNavigate();
    const [barcode, setBarcode] = useState('');
    const [produto, setProduto] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [desconto, setDesconto] = useState(0);
    const [vendas, setVendas] = useState([]);
    const [totalVenda, setTotalVenda] = useState(0);
    const [userName, setUserName] = useState(""); 
    const [userId, setUserId] = useState(""); // Total de toda a venda

    
    useEffect(() => {
      const loggedInUserId = localStorage.getItem("userId"); 
      const loggedInUser = localStorage.getItem("userName");// Pega do localStorage
      if (loggedInUser) {
        setUserName(loggedInUser);
        setUserId(loggedInUserId); // Define o nome do usuário no estado
         // Define o nome do usuário no estado
      }
    }, []);
    
    const handleSearchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/venda/produto/${barcode}`);
        if (response.data) {
          setProduto(response.data);
          const valorUnitario = parseFloat(response.data.preco); // Usando preco
          calcularValorTotal(valorUnitario, quantidade, desconto);
        }
      } catch (error) {
        console.error('Produto não encontrado:', error);
      }
      
    };
    
    // Função para calcular o valor total com base na quantidade e desconto por produto
    const calcularValorTotal = (valorUnit, qtd, desc) => {
      const total = (qtd * valorUnit) - desc;
      return total >= 0 ? total : 0; // Retorna o total positivo ou zero
    };

    // Função para adicionar item à venda
    const handleAddItem = () => {
      if (produto && quantidade > 0) {
        const valorUnit = parseFloat(produto.preco); // Garantir que o valor unitário seja numérico
        const totalItem = calcularValorTotal(valorUnit, quantidade, desconto); // Calcular o valor total do item

        const item = {
          produtoID: produto.produtoID, // Usando produtoID
          nomeProduto: produto.nomeProduto || 'Produto sem nome', // Usando nomeProduto
          quantidade,
          valorUnit,
          desconto: parseFloat(desconto), // Garantindo que o desconto seja numérico
          valorTotal: totalItem.toFixed(2), // Valor total do item
        };

        // Atualiza o estado de vendas com o novo item
        setVendas([...vendas, item]);

        // Atualiza o total da venda somando todos os itens
        const novoTotalVenda = [...vendas, item].reduce((acc, venda) => acc + parseFloat(venda.valorTotal), 0);
        setTotalVenda(novoTotalVenda.toFixed(2));

        resetForm();
      }
    };

    // Função para deletar item da venda
    const handleDeleteItem = (index) => {
      const updatedVendas = vendas.filter((_, i) => i !== index);
      setVendas(updatedVendas);

      // Atualiza o total da venda ao remover um item
      const novoTotalVenda = updatedVendas.reduce((acc, venda) => acc + parseFloat(venda.valorTotal), 0);
      setTotalVenda(novoTotalVenda.toFixed(2));
    };

    // Função para finalizar a venda
    const handleFinalizeSale = async () => {
      const vendaData = {
        dataVenda: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
        totalVenda: parseFloat(totalVenda),
        desconto: parseFloat(desconto),
        usuario_usuarioID: userId , // Mude conforme necessário
        items: vendas.map(item => ({
          produtoID: item.produtoID,
          quantidade: item.quantidade,
          valorproduto: item.valorUnit,
          valortotalproduto: item.valorTotal,
          valordescontoproduto: item.desconto,
        })),
      };
    
      try {
        const response = await axios.post('http://localhost:8080/api/venda/venda', vendaData);
        console.log('Venda finalizada:', response.data);
        resetForm();
        setVendas([]);
        setTotalVenda(0);
      } catch (error) {
        console.error('Erro ao finalizar a venda:', error);
      }
    };
    

    // Função para resetar o formulário
    const resetForm = () => {
      setBarcode('');
      setProduto(null);
      setQuantidade(1);
      setDesconto(0);
    };

    return (
      <div className="sales-container">
        <header className="sales-header flex justify-between items-center p-6">
          <h1 className="text-xl font-bold">Vendas</h1>
          <div className="flex items-center space-x-4">
            <span className="text-whrite-800">{userName}</span>
            <div className="flex items-center space-x-2">
              <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
            </div>
          </div>
        </header>

        <div className="sales-nav flex justify-between p-4">
          <div>
            <h2 className="text-lg">Informe o produto</h2>
          </div>
        </div>

        <main className="sales-main p-6">
          <div className="sales-search flex mb-6">
            <input
              type="text"
              placeholder="Código de Barras"
              className="input-search w-full"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
            <button className="btn btn-search ml-4" onClick={handleSearchProduct}>
              <FaSearch />
            </button>
          </div>

          {produto && (
            <div className="sales-info-grid mb-6">
              <div className="sales-info-item">Produto: {produto.nomeProduto || 'Produto sem nome'}</div>
              <div className="sales-info-item">Preço Unit.: {parseFloat(produto.preco).toFixed(2)}</div>
              <input
                type="number"
                className="sales-info-item"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
              <input
                type="number"
                className="sales-info-item"
                value={desconto}
                onChange={(e) => setDesconto(e.target.value)}
              />
              <div className="sales-info-item">Valor Total: {calcularValorTotal(parseFloat(produto.preco), quantidade, desconto).toFixed(2)}</div>
            </div>
          )}

          <div className="sales-summary mb-6">
            <button className="btn btn-add" onClick={handleAddItem}>
              Adicionar Item
            </button>
            <h3 className="text-lg">
              Valor da Compra: <span className="text-red-500">{totalVenda}</span> {/* Exibindo o total da venda */}
            </h3>
          </div>

          <div className="sales-table overflow-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Produto</th>
                  <th className="border p-2">Quantidade</th>
                  <th className="border p-2">Desconto</th> {/* Nova coluna de desconto */}
                  <th className="border p-2">Valor Total</th>
                  <th className="border p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{item.nomeProduto}</td>
                    <td className="border p-2">{item.quantidade}</td>
                    <td className="border p-2">{item.desconto.toFixed(2)}</td> {/* Exibindo o desconto do item */}
                    <td className="border p-2">{item.valorTotal}</td>
                    <td className="border p-2">
                      <FaTrash className="cursor-pointer" onClick={() => handleDeleteItem(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>    
            </table>
          </div>

          <footer className="sales-footer mt-8">
            <div className="sales-actions flex space-x-4">
              <button className="btn btn-finalize" onClick={handleFinalizeSale}>
                <FaCheck className="mr-2" />
                Finalizar Venda
              </button>
            </div>
          </footer>
        </main>
      </div>
    );
  };

  export default Vendas;
