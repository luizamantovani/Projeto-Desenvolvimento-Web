import './App.css';
import { useState } from 'react';
import ToDoList from './ToDoList/ToDoList';
import ContadorDeCliques from './ContadorDeCliques/ContadorDeCliques';
import JogoDaVelha from './JogoDaVelha/JogoDaVelha';
import FormularioCEP from './FormularioCEP/FormularioCEP';

function App() {
  const [mostrarResultado, setMostrarResultado] = useState({
    ToDoList: false,
    ContadorDeCliques: false,
    JogoDaVelha: false,
    FormularioCEP: false
  });
  return (
    <div className="App">
      <header className="App-header">
        <h1>Funcionalidades</h1>
        <nav className="App-nav">
          <a href="#todo" onClick={() => setMostrarResultado({ ...mostrarResultado, ToDoList: true, ContadorDeCliques: false, JogoDaVelha: false, FormularioCEP: false })}>To Do List</a>
          <a href="#contador" onClick={() => setMostrarResultado({ ...mostrarResultado, ContadorDeCliques: true, ToDoList: false, JogoDaVelha: false, FormularioCEP: false })}>Contador de Cliques</a>
          <a href="#jogo" onClick={() => setMostrarResultado({ ...mostrarResultado, JogoDaVelha: true, ToDoList: false, ContadorDeCliques: false, FormularioCEP: false })}>Jogo da Velha</a>
          <a href="#cep" onClick={() => setMostrarResultado({ ...mostrarResultado, FormularioCEP: true, ToDoList: false, ContadorDeCliques: false, JogoDaVelha: false })}>Buscador de CEPs</a>
        </nav>
      </header>

      <main className="App-main">
        {mostrarResultado.ToDoList && (
          <ToDoList />

        )}

        {mostrarResultado.ContadorDeCliques && (
          <ContadorDeCliques />
        )}

        {mostrarResultado.JogoDaVelha && (
          <JogoDaVelha />
        )}

        {mostrarResultado.FormularioCEP && (
          <FormularioCEP />
        )}
      </main>
    </div>
  );
}

export default App;
