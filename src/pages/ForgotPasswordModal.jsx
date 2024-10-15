  import React, { useState } from "react";
  import axios from "axios";

  const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setErrorMessage("");
      setMessage("");

      try {
        // Envia o e-mail para o backend para recuperação de senha
        await axios.post("http://localhost:8080/api/usuario/forgot-password", {
          email,
        });

        setMessage(
          "Instruções de redefinição de senha foram enviadas para seu e-mail."
        );
      } catch (error) {
        setErrorMessage("Erro ao enviar e-mail de recuperação. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            Esqueceu sua senha?
          </h2>
          {message ? (
            <p className="text-green-500 text-center mb-4">{message}</p>
          ) : (
            <>
              <p className="text-gray-600 text-center mb-4">
                Insira o seu e-mail para receber as instruções de redefinição de
                senha.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
              {errorMessage && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  export default ForgotPasswordModal;
