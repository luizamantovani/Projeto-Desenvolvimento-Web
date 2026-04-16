import { useState } from 'react';
import './Calculadora.css';

export default function Calculadora() {
  const [valor, setValor] = useState('0');

  const adicionarDigito = (digito) => {
    setValor((atual) => {
      if (atual === 'Erro') return digito;
      if (atual === '0' && digito !== '.') return digito;
      if (digito === '.' && atual.includes('.')) return atual;
      return atual + digito;
    });
  };

  const limpar = () => setValor('0');

  const calcular = () => {
    try {
      const ultimo = valor.slice(-1);
      if (['+', '-', 'x', '÷'].includes(ultimo)) return;

      // eslint-disable-next-line
      const resultado = eval(
        valor
          .replace(/x/g, '*')
          .replace(/÷/g, '/')
      );

      setValor(String(resultado));
    } catch {
      setValor('Erro');
    }
  };

  const adicionarOperador = (operador) => {
    setValor((atual) => {
      if (atual === 'Erro') return '0';

      const ultimo = atual.slice(-1);
      const operadores = ['+', '-', 'x', '÷'];

      if (operadores.includes(ultimo)) {
        return atual.slice(0, -1) + operador;
      }

      return atual + operador;
    });
  };

  return (
    <div className="container">
      <h2 className="titulo">Calculadora</h2>

      <div className="display">
        {valor}
      </div>

      <div className="botoes">
        {[
          '7', '8', '9', '÷',
          '4', '5', '6', 'x',
          '1', '2', '3', '-',
          '0', '.', '=', '+'
        ].map((item) => {

          if (item === '=') {
            return (
              <button
                key={item}
                onClick={calcular}
                className="botao"
              >
                {item}
              </button>
            );
          }

          if (['÷', 'x', '-', '+'].includes(item)) {
            return (
              <button
                key={item}
                onClick={() => adicionarOperador(item)}
                className="botao operador"
              >
                {item}
              </button>
            );
          }

          return (
            <button
              key={item}
              onClick={() => adicionarDigito(item)}
              className="botao"
            >
              {item}
            </button>
          );
        })}

        <button onClick={limpar} className="limpar">
          C
        </button>
      </div>
    </div>
  );
}