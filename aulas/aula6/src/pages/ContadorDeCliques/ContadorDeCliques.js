import React, { useState } from 'react';
import './ContadorDeCliques.css';

const ContadorDeCliques = () => {
  const [contador, setContador] = useState(0);

  return (
    <div className="page">
      <div className="card">
        <h1>Contador de Cliques</h1>
        <p className="contador">{contador}</p>

        <button onClick={() => setContador(contador + 1)}>
          Clique aqui
        </button>
      </div>
    </div>
  );
};

export default ContadorDeCliques;