// src/pages/ClientRegistration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Cliente.css'; // Ajustar o caminho conforme necessário

const Cliente = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [type, setType] = useState('física');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [complement, setComplement] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    // Lógica para salvar o cliente
    console.log('Salvar cliente:', { name, cpfCnpj, type, number, district, complement, phone, email });
  };

  return (
    <div className="client-registration-container h-screen w-screenbg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col">
      <header className="accounts-payable-header flex justify-between items-center p-6">
        <h1 className="text-xl font-bold">Cliente</h1>
        <div className="flex items-center space-x-4">
          <span>Tiago Oliveira da Silva</span>
          <div className="flex items-center space-x-2">
            <FaArrowLeft onClick={() => navigate(-1)} className="text-lg cursor-pointer" title="Voltar" />
          </div>
        </div>
      </header>

      <div className="client-registration-box bg-white text-black p-8 rounded-lg shadow-lg w-3/4 mx-auto mt-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Cadastro de Cliente</h1>
          <button onClick={() => navigate(-1)} className="btn btn-back">Voltar</button>
        </div>

        <div className="client-registration-search flex mb-6">
          <input 
            type="text" 
            placeholder="Buscar clientes..." 
            className="input-search flex-1 p-2 border rounded-l" 
          />
          <button className="btn btn-search rounded-r px-4">Pesquisar</button>
        </div>

        <div className="client-list mb-6 bg-gray-100 p-4 rounded-lg overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">Cliente</th>
                <th className="p-2 border-b">CPF/CNPJ</th>
                <th className="p-2 border-b">Endereço</th>
                <th className="p-2 border-b">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {/* Adicionar lista de clientes aqui */}
              <tr>
                <td className="p-2 border-b">Exemplo Nome</td>
                <td className="p-2 border-b">000.000.000-00</td>
                <td className="p-2 border-b">Rua Exemplo, 123</td>
                <td className="p-2 border-b">(00) 0000-0000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="client-details mt-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Nome</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-detail p-2 border rounded" 
              />
            </div>
            <div className="flex flex-col">
              <label>CPF/CNPJ</label>
              <input 
                type="text" 
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
                className="input-detail p-2 border rounded" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label>Endereço</label>
              <input 
                type="text" 
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="input-detail p-2 border rounded" 
              />
            </div>
            <div className="flex flex-col">
              <label>Telefone</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-detail p-2 border rounded" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label>Bairro</label>
              <input 
                type="text" 
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="input-detail p-2 border rounded" 
              />
            </div>
            <div className="flex flex-col">
              <label>Complemento</label>
              <input 
                type="text" 
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                className="input-detail p-2 border rounded" 
              />
            </div>
          </div>
          <div className="flex mt-4">
            <label className="mr-4">Tipo:</label>
            <label className="flex items-center mr-4">
              <input 
                type="radio" 
                value="física" 
                checked={type === 'física'}
                onChange={() => setType('física')} 
              /> 
              <span className="ml-2">Física</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                value="jurídica" 
                checked={type === 'jurídica'}
                onChange={() => setType('jurídica')} 
              /> 
              <span className="ml-2">Jurídica</span>
            </label>
          </div>
          <div className="flex justify-between mt-6">
            <button className="btn btn-add">Adicionar</button>
            <button className="btn btn-delete">Excluir</button>
            <button onClick={handleSave} className="btn btn-save">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cliente;
