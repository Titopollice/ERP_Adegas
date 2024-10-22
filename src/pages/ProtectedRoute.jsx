import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userName"); // Verifica se o nome do usuário está salvo

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/" />;
  }

  return children; // Caso contrário, renderiza o conteúdo protegido
};

export default ProtectedRoute;
