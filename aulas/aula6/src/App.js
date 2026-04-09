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
      <header></header>

      
    </div>
  );
}

export default App;
