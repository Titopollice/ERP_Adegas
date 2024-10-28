import { render, fireEvent } from '@testing-library/react';
import Fornecedores from '../pages/Fornecedor';

test('edits supplier information', () => {
  const { getByText, getByLabelText } = render(<Fornecedores />);

  // Simula o clique no botão de editar de um fornecedor específico
  fireEvent.click(getByText(/Editar/i));

  // Edita o nome e o CNPJ do fornecedor
  fireEvent.change(getByLabelText(/Nome/i), { target: { value: 'Fornecedor A Editado' } });
  fireEvent.change(getByLabelText(/CNPJ/i), { target: { value: '12345678900099' } });

  // Salva as alterações
  fireEvent.click(getByText(/Salvar Alterações/i));

  // Verifica se os dados foram atualizados
  expect(getByText(/Fornecedor A Editado/i)).toBeInTheDocument();
  expect(getByText(/12345678900099/i)).toBeInTheDocument();
});
