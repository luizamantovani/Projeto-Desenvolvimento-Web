import './App.css';
import { useState } from 'react';
import Header from './components/header';
import ToDoList from './pages/ToDoList/ToDoList';
import ContadorDeCliques from './pages/ContadorDeCliques/ContadorDeCliques';
import JogoDaVelha from './pages/JogoDaVelha/JogoDaVelha';
import FormularioCEP from './pages/FormularioCEP/FormularioCEP';


function App() {
  const [mostrarResultado, setMostrarResultado] = useState({
    ToDoList: false,
    ContadorDeCliques: false,
    JogoDaVelha: false,
    FormularioCEP: false
  });
  return (
    <div className="App">
      <Header
        mostrarResultado={mostrarResultado}
        setMostrarResultado={setMostrarResultado}
      />

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
