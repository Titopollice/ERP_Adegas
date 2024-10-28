
import React from 'react';
import { render } from '@testing-library/react';
import Login from './pages/Login';

describe('Login Component', () => {
    test('renders Login component without crashing', () => {
        render(<Login />);
    });

    test('displays login form', () => {
        const { getByPlaceholderText } = render(<Login />);
        expect(getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
        expect(getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    });
});
    