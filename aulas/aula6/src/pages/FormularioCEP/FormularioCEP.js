import React, { useState } from "react";
import "./FormularioCEP.css";

function FormularioCEP() {
  const [cep, setCep] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [endereco, setEndereco] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: ""
  });

  const buscarCEP = async (valor) => {
    const cepLimpo = valor.replace(/\D/g, "");

    if (cepLimpo.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setEndereco({
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        });
      }
    }
  };

  return (
    <div className="container">
      <h2>Buscar CEP</h2>

      <input
        className="input"
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => {
          setCep(e.target.value);
          buscarCEP(e.target.value);
        }}
      />


      <button onClick={() => setMostrarResultado(true)}>
        Procurar
      </button>
      {mostrarResultado && (
        <div className="resultado">
          <input
            className="input"
            type="text"
            placeholder="Rua"
            value={endereco.rua}
            readOnly
          />

          <input
            className="input"
            type="text"
            placeholder="Bairro"
            value={endereco.bairro}
            readOnly
          />

          <input
            className="input"
            type="text"
            placeholder="Cidade"
            value={endereco.cidade}
            readOnly
          />

          <input
            className="input"
            type="text"
            placeholder="Estado"
            value={endereco.estado}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default FormularioCEP;