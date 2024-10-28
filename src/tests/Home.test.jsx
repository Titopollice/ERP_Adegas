import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import { vi } from "vitest";

// Mock para o navigate
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    // Simula o localStorage
    localStorage.setItem("userName", "Test User");
    localStorage.setItem("userId", "0");
  });

  afterEach(() => {
    // Limpa o localStorage após os testes
    localStorage.clear();
  });

  test("renders Home component without crashing", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Adegas SGE/i)).toBeInTheDocument();
  });

  test("displays correct user name", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });

  test("renders 'Cadastros' section by default", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/Fornecedor/i)).toBeInTheDocument();
    expect(screen.getByText(/Cliente/i)).toBeInTheDocument();
  });

  test("switches to 'Utilitários' section when clicked", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Utilitários/i));
    expect(screen.getByText(/Venda/i)).toBeInTheDocument();
    expect(screen.getByText(/Gerar A Pagar/i)).toBeInTheDocument();
  });

  test("switches to 'Relatórios' section when clicked", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Relatórios/i));
    expect(screen.getByText(/Venda Realizada/i)).toBeInTheDocument();
    expect(screen.getByText(/A Pagar/i)).toBeInTheDocument();
  });

  test("opens and closes user dropdown", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Test User/i));
    expect(screen.getByText(/Sair/i)).toBeInTheDocument();
    fireEvent.click(document.body); // Simula um clique fora do dropdown
    expect(screen.queryByText(/Sair/i)).not.toBeInTheDocument();
  });

  test("logout clears localStorage and navigates away", () => {
    const navigateMock = vi.fn();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Test User/i));
    fireEvent.click(screen.getByText(/Sair/i));
    expect(localStorage.getItem("userName")).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
