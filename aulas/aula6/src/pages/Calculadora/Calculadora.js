import { useState } from 'react';

export default function Calculadora() {
  const [valor, setValor] = useState('0');

  const adicionarDigito = (digito) => {
    setValor((atual) => {
      if (atual === '0' && digito !== '.') {
        return digito;
      }
      if (digito === '.' && atual.includes('.')) {
        return atual;
      }
      return atual + digito;
    });
  };

  const limpar = () => setValor('0');

  const calcular = () => {
    try {
      const resultado = eval(valor.replace('×', '*').replace('÷', '/'));
      setValor(String(resultado));
    } catch (erro) {
      setValor('Erro');
    }
  };

  const adicionarOperador = (operador) => {
    setValor((atual) => {
      const ultimo = atual.slice(-1);
      const operadores = ['+', '-', '×', '÷'];
      if (operadores.includes(ultimo)) {
        return atual.slice(0, -1) + operador;
      }
      return atual + operador;
    });
  };

  return (
    <div style={{ maxWidth: 320, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8, fontFamily: 'Arial, sans-serif' }}>
      <h2>Calculadora</h2>
      <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 6, marginBottom: 16, fontSize: 32, textAlign: 'right', minHeight: 60 }}>
        {valor}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((item) => {
          if (item === '=') {
            return (
              <button key={item} onClick={calcular} style={buttonStyle}>
                {item}
              </button>
            );
          }
          if (item === '÷' || item === '×' || item === '-' || item === '+') {
            return (
              <button key={item} onClick={() => adicionarOperador(item)} style={{ ...buttonStyle, background: '#f0ad4e', color: '#fff' }}>
                {item}
              </button>
            );
          }
          return (
            <button key={item} onClick={() => adicionarDigito(item)} style={buttonStyle}>
              {item}
            </button>
          );
        })}
        <button onClick={limpar} style={{ gridColumn: 'span 4', padding: '14px 0', background: '#d9534f', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 18 }}>
          C
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: 14,
  fontSize: 18,
  borderRadius: 6,
  border: '1px solid #ccc',
  background: '#fff',
  cursor: 'pointer',
};
