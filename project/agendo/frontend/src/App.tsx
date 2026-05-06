import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Progresso } from './pages/Progresso';
import { ConfigurarPlano } from './pages/ConfigurarPlano';
import { Cronograma } from './pages/Cronograma';
import { EsqueciSenha } from './pages/EsqueciSenha';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/progresso" element={<Progresso />} />
        <Route path="/configurar" element={<ConfigurarPlano />} />
        <Route path="/cronograma" element={<Cronograma />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
