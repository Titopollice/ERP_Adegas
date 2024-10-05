// src/pages/Produtos.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './Produtos.css'; // Importação do CSS padrão

const Produtos = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [safra, setSafra] = useState("");
  const [paisdeorigem, setPaisDeOrigem] = useState("");
  const [tipodeuva, setTipoDeUva] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [codigodebarras, setCodigoDeBarras] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(true); // Novo estado para gerenciar a desativação dos campos

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = () => {
    if (searchTerm.trim() === "") {
      // Se o campo de pesquisa estiver vazio, busque todos os produtos
      axios
        .get("http://localhost:8080/api/produto")
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
        });
    } else {
      // Se houver termo de pesquisa, busque por nome
      axios
        .get(`http://localhost:8080/api/produto/nome/${searchTerm}`)
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos pelo nome:", error);
        });
    }
  };

  const adicionarProduto = () => {
    const novoProduto = {
      nomeProduto,
      safra,
      paisdeorigem,
      tipodeuva,
      classificacao,
      preco,
      estoque,
      codigodebarras,
      temperatura,
      status: 'Ativo'  // Adicione esta linha para definir o status como 'Ativo' por padrão
    };

    axios
      .post("http://localhost:8080/api/produto", novoProduto)
      .then(() => {
        buscarProdutos();
        limparCampos();
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);
      });
  };

  const atualizarProduto = () => {
    const produtoAtualizado = {
      nomeProduto,
      safra,
      paisdeorigem,
      tipodeuva,
      classificacao,
      preco,
      estoque,
      codigodebarras,
      temperatura,
    };

    axios
      .put(`http://localhost:8080/api/produto/${selectedProductId}`, produtoAtualizado)
      .then(() => {
        buscarProdutos();
        limparCampos();
        setIsEditing(false);
        setFieldsDisabled(true); // Desativa os campos após a atualização
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
      });
  };

  const excluirProduto = (id, statusAtual) => {
    const novoStatus = statusAtual === 'Ativo' ? 'Inativo' : 'Ativo';

    axios
      .patch(`http://localhost:8080/api/produto/${id}`, { status: novoStatus })
      .then(() => {
        setProdutos((prevProdutos) =>
          prevProdutos.map((produto) =>
            produto.produtoID === id ? { ...produto, status: novoStatus } : produto
          )
        );
        buscarProdutos();
      })
      .catch((error) => {
        console.error("Erro ao alterar o status do produto:", error);
      });
  };

  const editarProduto = (produto) => {
    setSelectedProductId(produto.produtoID);
    setNomeProduto(produto.nomeProduto);
    setSafra(produto.safra);
    setPaisDeOrigem(produto.paisdeorigem);
    setTipoDeUva(produto.tipodeuva);
    setClassificacao(produto.classificacao);
    setPreco(produto.preco);
    setEstoque(produto.estoque);
    setCodigoDeBarras(produto.codigodebarras);
    setTemperatura(produto.temperatura);
    setIsEditing(true);
    setFieldsDisabled(false); // Ativa os campos para edição
  };

  const limparCampos = () => {
    setNomeProduto("");
    setSafra("");
    setPaisDeOrigem("");
    setTipoDeUva("");
    setClassificacao("");
    setPreco("");
    setEstoque("");
    setCodigoDeBarras("");
    setTemperatura("");
    setSelectedProductId(null);
    setIsEditing(false);
    setFieldsDisabled(true); // Desativa os campos após limpar
  };

  return (
    <div className="products-container">
      <header className="products-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Estoque</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
            <FaUserCircle className="text-lg" />
          </div>
        </div>
      </header>

      <div className="products-nav flex justify-between p-4">
        <div>
          <h2 className="text-lg">Estoque</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn btn-add flex items-center" onClick={() => { adicionarProduto(); setFieldsDisabled(false); }} disabled={isEditing}>
            <FaPlus className="mr-2" />
            Adicionar
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>

      <main className="products-main p-6">
        <div className="products-search flex mb-6">
          <input type="text" placeholder="Produto" className="input-search w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="btn btn-search ml-4" onClick={buscarProdutos}>Buscar</button>
        </div>

        <div className="products-table overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2">Produto</th>
                <th className="border p-2">Preço</th>
                <th className="border p-2">Quantidade</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length > 0 ? (
                produtos.map((produto) => (
                  <tr key={produto.produtoID}>
                    <td className="border p-2 text-center">{produto.produtoID}</td>
                    <td className="border p-2 text-center">{produto.nomeProduto}</td>
                    <td className="border p-2 text-center">{produto.preco}</td>
                    <td className="border p-2 text-center">{produto.estoque}</td>
                    <td className="border p-2 text-center">{produto.status}</td>
                    <td className="border p-2 text-center flex justify-center">
                      <button className="btn btn-edit flex items-center mr-2" onClick={() => editarProduto(produto)}>
                        <FaEdit className="mr-2" />
                        Editar
                      </button>
                      <button className="btn btn-delete flex items-center" onClick={() => excluirProduto(produto.produtoID, produto.status)}>
                        <FaTrash className="mr-2" />
                        {produto.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border p-2 text-center">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="products-details mt-8">
          <h3 className="text-lg mb-4">Detalhes do Produto</h3>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Nome do Produto" className="input-detail" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="Safra" className="input-detail" value={safra} onChange={(e) => setSafra(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="País de Origem" className="input-detail" value={paisdeorigem} onChange={(e) => setPaisDeOrigem(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="Tipo de Uva" className="input-detail" value={tipodeuva} onChange={(e) => setTipoDeUva(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="Classificação" className="input-detail" value={classificacao} onChange={(e) => setClassificacao(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="Preço" className="input-detail" value={preco} onChange={(e) => setPreco(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="Estoque" className="input-detail" value={estoque} onChange={(e) => setEstoque(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="Código de Barras" className="input-detail" value={codigodebarras} onChange={(e) => setCodigoDeBarras(e.target.value)} disabled={fieldsDisabled} />
            <input type="text" placeholder="Temperatura" className="input-detail" value={temperatura} onChange={(e) => setTemperatura(e.target.value)} disabled={fieldsDisabled} />
          </div>
        </div>

        <div className="products-actions mt-4">
          {isEditing ? (
            <button className="btn btn-save" onClick={atualizarProduto}>
              Salvar Alterações
            </button>
          ) : (
            <button className="btn btn-save" onClick={() => { adicionarProduto(); setFieldsDisabled(false); }}>
              Salvar
            </button>
          )}
          <button className="btn btn-clear ml-4" onClick={limparCampos}>Limpar</button>
        </div>
      </main>
    </div>
  );
};

export default Produtos;
