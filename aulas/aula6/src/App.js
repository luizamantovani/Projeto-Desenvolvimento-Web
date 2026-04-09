import './App.css';
import { useState } from 'react';
import Header from './components/header';


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

    </div>
  );
}

export default App;
