import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Botao } from '../components/ui/Botao';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { loginUsuario } from '../service/authService';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await loginUsuario(formData);

      localStorage.setItem('@Agendo:token', data.token);
      localStorage.setItem('@Agendo:user', JSON.stringify(data.usuarioLoginResponse));

      const possuiCronograma = data.possuiCronograma;

      if (possuiCronograma) {
        navigate('/cronograma');
      }
      else {
        navigate('/configurar');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message || 'Erro de conexão com o servidor. Tente novamente.');
      console.error('Login Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <Helmet>
        <title>Entrar - Agendo</title>
        <meta name="description" content="Faça login no Agendo para acessar seu cronograma de estudos." />
        <meta property="og:title" content="Entrar - Agendo" />
        <meta property="og:description" content="Faça login no Agendo para acessar seu cronograma de estudos." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 bg-white dark:bg-slate-900">
            <Link to="/" className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-3xl">auto_stories</span>
              <h2 className="text-xl font-bold">Agendo</h2>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link className="hidden md:block text-sm font-semibold text-primary hover:underline" to="/cadastro">
                Criar uma conta
              </Link>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-275 grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <div className="hidden lg:block relative bg-primary/5">
                <div className="h-full w-full bg-center bg-cover flex flex-col justify-end p-12 text-white relative"
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80")' }}>
                  <div className="relative z-10">
                    <h1 className="text-4xl font-black mb-4">Domine seus estudos com precisão.</h1>
                    <p className="text-lg opacity-90">Organize sua vida acadêmica com o workspace inteligente do Agendo.</p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-black mb-2">Bem-vindo de Volta</h2>
                  <p className="text-slate-500 dark:text-slate-400">Faça login para continuar sua jornada</p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-pulse">
                    {errorMessage}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleLogin}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Endereço de E-mail</label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="estudante@universidade.edu"
                      type="email"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold">Senha</label>
                      <a className="text-xs font-semibold text-primary hover:underline" href="#">Esqueceu a senha?</a>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-4 pr-12 py-3.5 outline-none focus:ring-2 focus:ring-primary transition-all"
                        value={formData.senha}
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                        placeholder="••••••••"
                        type={mostrarSenha ? "text" : "password"}
                        required
                      />
                      <button
                        className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        type="button"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                      >
                        <span className="material-symbols-outlined">
                          {mostrarSenha ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <Botao type="submit" className="w-full py-4 h-14" disabled={isLoading}>
                    {isLoading ? (
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                      'Entrar'
                    )}
                  </Botao>
                </form>

                <div className="mt-8 text-center lg:hidden">
                  <span className="text-sm text-slate-500">Novo no Agendo?</span>
                  <Link className="ml-1 text-sm font-semibold text-primary hover:underline" to="/cadastro">Criar conta</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};