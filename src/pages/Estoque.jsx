import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaPlus, FaTrash } from 'react-icons/fa';
import './Estoque.css'; // Importação do CSS padrão para estilos

const Estoque = () => {
  const navigate = useNavigate();

  // Estado para fornecedores e produtos
  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([{ produtoID: '', quantidade: '' }]);
  const [dataMovimentacao, setDataMovimentacao] = useState(new Date().toISOString().slice(0, 10)); // Data atual
  const [userName, setUserName] = useState(""); 
  // Função para buscar fornecedores e produtos na API
  useEffect(() => {
    const fetchFornecedores = async () => {
      const response = await fetch('http://localhost:8080/api/fornecedor');
      const data = await response.json();
      setFornecedores(data);
      const loggedInUser = localStorage.getItem("userName"); // Pega do localStorage
      if (loggedInUser) {
      setUserName(loggedInUser); // Define o nome do usuário no estado
    }
    };

    const fetchProdutos = async () => {
      const response = await fetch('http://localhost:8080/api/produto'); // Endpoint para buscar produtos
      const data = await response.json();
      setProdutos(data);
    };

    fetchFornecedores();
    fetchProdutos();
  }, []);

  // Função para adicionar novo campo de produto e quantidade
  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { produtoID: '', quantidade: '' }]);
  };

  // Função para remover um campo de produto e quantidade
  const handleRemoveProduct = (index) => {
    const newProducts = [...selectedProducts];
    newProducts.splice(index, 1); // Remove o produto do array
    setSelectedProducts(newProducts);
  };

  // Função para lidar com a mudança de valor nos campos
  const handleInputChange = (index, field, value) => {
    const newProducts = [...selectedProducts];
    newProducts[index][field] = value;
    setSelectedProducts(newProducts);
  };

  // Função para salvar o cadastro com o fornecedor e os produtos vinculados
  const handleSave = async () => {
    if (!selectedFornecedor) {
      alert("Por favor, selecione um fornecedor.");
      return;
    }

    const hasEmptyProduct = selectedProducts.some(
      (product) => !product.produtoID || !product.quantidade
    );

    if (hasEmptyProduct) {
      alert("Por favor, preencha todos os campos de produto e quantidade.");
      return;
    }

    // Itera sobre os produtos selecionados e faz uma requisição POST para cada produto
    for (const product of selectedProducts) {
      const payload = {
        quantidade: product.quantidade,
        DataDaMovimentacao: dataMovimentacao, // Nome do campo no backend
        Produto_produtoID: product.produtoID, // Nome do campo no backend
        IdFornecedor: selectedFornecedor // Nome do campo no backend
      };

      try {
        const response = await fetch('http://localhost:8080/api/estoque', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Erro ao salvar: ${errorData.error}`);
          return;
        }
      } catch (error) {
        console.error('Erro ao salvar a entrada de estoque:', error);
        alert('Erro ao salvar a entrada de estoque.');
        return;
      }
    }

    alert('Entrada de estoque salva com sucesso!');
    setSelectedProducts([{ produtoID: '', quantidade: '' }]); // Limpa os campos
    setSelectedFornecedor(''); // Reseta fornecedor
  };

  return (
    <div className="product-entry-container">
      <header className="product-entry-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Entrada de Produtos</h1>
        <div className="flex items-center space-x-4">
        <span className="text-whrite-800">{userName}</span> 
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>
       
      <main className="product-entry-main p-6">
        <div className="product-entry-search flex mb-6">
          <input type="text" placeholder="Entrada" className="input-search w-full" />
          <button className="btn btn-search ml-4">
            <FaSearch />
          </button>
        </div>

        <div className="product-entry-details mt-8">
          <h3 className="text-lg mb-4">Data da Movimentação</h3>
          <input
            type="date"
            className="input-detail w-full mb-4"
            value={dataMovimentacao}
            onChange={(e) => setDataMovimentacao(e.target.value)}
          />

          <h3 className="text-lg mb-4">Fornecedor</h3>
          <select
            className="input-detail w-full mb-4"
            value={selectedFornecedor}
            onChange={(e) => setSelectedFornecedor(e.target.value)}
          >
            <option value="">Selecione um Fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.fornecedorID} value={fornecedor.fornecedorID}>
                {fornecedor.nome}
              </option>
            ))}
          </select>

          <div className="mt-8">
            <h3 className="text-lg mb-4">Adicionar Produtos</h3>
            {selectedProducts.map((product, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                <select
                  className="input-detail"
                  value={product.produtoID}
                  onChange={(e) => handleInputChange(index, 'produtoID', e.target.value)}
                >
                  <option value="">Selecione um Produto</option>
                  {produtos.map((produto) => (
                    <option key={produto.produtoID} value={produto.produtoID}>
                      {produto.nomeProduto}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Quantidade"
                  className="input-detail"
                  value={product.quantidade}
                  onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)}
                />
                <button className="btn btn-remove-product" onClick={() => handleRemoveProduct(index)}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <button className="btn btn-add-product" onClick={handleAddProduct}>
              <FaPlus />  Adicionar Produto
            </button>
          </div>
        </div>

        <div className="product-entry-actions mt-8 flex justify-between">
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
          <button className="btn btn-save" onClick={handleSave}>Salvar</button>
        </div>
      </main>
    </div>
  );
};

export default Estoque;
