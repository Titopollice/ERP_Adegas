import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Vendas from "../pages/Vendas";
import axios from "axios";
import { vi } from "vitest";

// Mock do axios para simular chamadas à API
vi.mock("axios");

describe("Vendas Component", () => {
  beforeEach(() => {
    // Simula o localStorage
    localStorage.setItem("userName", "Test User");
    localStorage.setItem("userId", "1");
  });

  afterEach(() => {
    // Limpa o localStorage e mocks após os testes
    localStorage.clear();
    vi.clearAllMocks();
  });

  // Teste 1: Renderização básica do componente Vendas
  test("renders Vendas component", () => {
    render(
      <MemoryRouter>
        <Vendas />
      </MemoryRouter>
    );
    expect(screen.getByText(/Vendas/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Código de Barras/i)).toBeInTheDocument();
  });

  // Teste 2: Busca de produto com sucesso (mock da API)
  test("successfully searches for a product", async () => {
    // Mock da resposta da API
    axios.get.mockResolvedValue({
      data: {
        produtoID: 1,
        nomeProduto: "Produto Teste",
        preco: "10.00",
      },
    });

    render(
      <MemoryRouter>
        <Vendas />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Código de Barras/i), {
      target: { value: "123456789" },
    });
    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    // Espera até que o produto seja exibido na tela
    await waitFor(() => {
      expect(screen.getByText(/Produto Teste/i)).toBeInTheDocument();
      expect(screen.getByText(/10.00/i)).toBeInTheDocument();
    });
  });

  // Teste 3: Finaliza a venda com sucesso (mock da API)
  test("finalizes the sale successfully", async () => {
    axios.post.mockResolvedValue({
      data: { success: true },
    });

    render(
      <MemoryRouter>
        <Vendas />
      </MemoryRouter>
    );

    // Simula a adição de um item na venda
    axios.get.mockResolvedValue({
      data: {
        produtoID: 1,
        nomeProduto: "Produto Teste",
        preco: "10.00",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/Código de Barras/i), {
      target: { value: "123456789" },
    });
    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Produto Teste/i)).toBeInTheDocument();
    });

    // Simula a finalização da venda
    fireEvent.click(screen.getByRole("button", { name: /finalizar venda/i }));

    await waitFor(() => {
      expect(screen.getByText(/Venda finalizada com sucesso/i)).toBeInTheDocument();
    });
  });
});
