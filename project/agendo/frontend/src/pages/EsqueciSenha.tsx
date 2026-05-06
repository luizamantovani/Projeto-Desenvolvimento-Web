import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Botao } from '../components/ui/Botao';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export const EsqueciSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // To be implemented
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <Helmet>
        <title>Esqueci a Senha - Agendo</title>
        <meta name="description" content="Recupere sua senha do Agendo." />
      </Helmet>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 bg-white dark:bg-slate-900">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo-full.png" alt="Agendo Logo" className="h-8 md:h-10 w-auto object-contain" />
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link className="hidden md:block text-sm font-semibold text-primary hover:underline" to="/login">
                Voltar ao Login
              </Link>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-275 grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <div className="hidden lg:block relative bg-primary/5">
                <div className="h-full w-full bg-center bg-cover flex flex-col justify-end p-12 text-white relative"
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80")' }}>
                  <div className="relative z-10">
                    <h1 className="text-4xl font-black mb-4">Recupere seu acesso.</h1>
                    <p className="text-lg opacity-90">Não perca o ritmo dos seus estudos. Vamos recuperar sua conta.</p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8 text-center">
                  <img src="/logo-full.png" alt="Agendo Logo" className="max-w-[200px] w-full mx-auto mb-6" />
                  <h2 className="text-3xl font-black mb-2">Esqueceu a senha?</h2>
                  <p className="text-slate-500 dark:text-slate-400">Insira seu e-mail para receber as instruções de recuperação.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Endereço de E-mail</label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="estudante@universidade.edu"
                      type="email"
                      required
                    />
                  </div>

                  <Botao type="submit" className="w-full py-4 h-14">
                    Enviar Instruções
                  </Botao>
                </form>

                <div className="mt-8 text-center">
                  <span className="text-sm text-slate-500">Lembrou a senha?</span>
                  <Link className="ml-1 text-sm font-semibold text-primary hover:underline" to="/login">Voltar ao login</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
