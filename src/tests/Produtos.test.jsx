
import React from 'react';
import { render } from '@testing-library/react';
import Produtos from '../pages/Produtos';

describe('Produtos Component', () => {
    test('renders Produtos component without crashing', () => {
        render(<Produtos />);
    });

    test('displays product list', () => {
        const { getByText } = render(<Produtos />);
        expect(getByText(/Adicionar/i)).toBeInTheDocument();
    });
});
    