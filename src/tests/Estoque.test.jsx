import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Estoque from '../pages/RelatorioEstoque';

describe('Estoque Component', () => {
  test('renders Estoque component without crashing', () => {
    render(
      <MemoryRouter>
        <Estoque />
      </MemoryRouter>
    );
  });

  test('displays estoque page content', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Estoque />
      </MemoryRouter>
    );
    expect(getByText(/Entrada de Produtos/i)).toBeInTheDocument();
  });
});
