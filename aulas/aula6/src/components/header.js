import '../App.css';
import Calculadora from '../pages/Calculadora/Calculadora';


function Header({ mostrarResultado, setMostrarResultado }) {
  return (
    <header className="App-header">
      <h1>Funcionalidades</h1>
      <nav className="App-nav">
        <a href="#todo" onClick={() => setMostrarResultado({ ...mostrarResultado, ToDoList: true, ContadorDeCliques: false, JogoDaVelha: false, FormularioCEP: false, Calculadora: false })}>To Do List</a>
        <a href="#contador" onClick={() => setMostrarResultado({ ...mostrarResultado, ContadorDeCliques: true, ToDoList: false, JogoDaVelha: false, FormularioCEP: false, Calculadora: false })}>Contador de Cliques</a>
        <a href="#jogo" onClick={() => setMostrarResultado({ ...mostrarResultado, JogoDaVelha: true, ToDoList: false, ContadorDeCliques: false, FormularioCEP: false, Calculadora: false })}>Jogo da Velha</a>
        <a href="#cep" onClick={() => setMostrarResultado({ ...mostrarResultado, FormularioCEP: true, ToDoList: false, ContadorDeCliques: false, JogoDaVelha: false, Calculadora: false })}>Buscador de CEPs</a>
        <a href="#calculadora" onClick={() => setMostrarResultado({ ...mostrarResultado, Calculadora: true, ToDoList: false, ContadorDeCliques: false, JogoDaVelha: false, FormularioCEP: false })}>Calculadora</a>
      </nav>
    </header>
  );
}

export default Header;