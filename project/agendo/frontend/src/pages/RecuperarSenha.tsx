import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Botao } from '../components/ui/Botao';
import { ThemeToggle } from '../components/ui/ThemeToggle';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const RecuperarSenha: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!token) {
      setMessage({ type: 'error', text: 'Token de recuperação inválido ou ausente.' });
      setIsLoading(false);
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMessage({ type: 'error', text: 'As senhas não coincidem.' });
      setIsLoading(false);
      return;
    }

    if (novaSenha.length < 6) {
      setMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres.' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/redefinir-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha })
      });

      const textResponse = await response.text();

      if (!response.ok) {
        throw new Error(textResponse || 'Erro ao redefinir a senha.');
      }

      setMessage({ type: 'success', text: textResponse || 'Senha redefinida com sucesso!' });
      
      // Redirect to login after a brief delay
      setTimeout(() => navigate('/login'), 3000);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro de conexão com o servidor.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <Helmet>
        <title>Redefinir Senha - Agendo</title>
        <meta name="description" content="Crie uma nova senha para sua conta do Agendo." />
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
                    <h1 className="text-4xl font-black mb-4">Crie sua nova senha.</h1>
                    <p className="text-lg opacity-90">Escolha uma senha forte para manter sua conta segura.</p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8 text-center">
                  <img src="/logo-full.png" alt="Agendo Logo" className="max-w-[200px] w-full mx-auto mb-6" />
                  <h2 className="text-3xl font-black mb-2">Redefinir Senha</h2>
                  <p className="text-slate-500 dark:text-slate-400">Insira sua nova senha abaixo.</p>
                </div>

                {message && (
                  <div className={`mb-6 p-4 text-sm font-medium ${message.type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-700 animate-pulse' : 'bg-green-50 border-l-4 border-green-500 text-green-700'}`}>
                    {message.text}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Nova Senha</label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-4 pr-12 py-3.5 outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        placeholder="••••••••"
                        type={mostrarNovaSenha ? "text" : "password"}
                        required
                        disabled={isLoading}
                      />
                      <button
                        className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        type="button"
                        onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                        aria-label={mostrarNovaSenha ? "Ocultar senha" : "Mostrar senha"}
                      >
                        <span className="material-symbols-outlined">
                          {mostrarNovaSenha ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Confirmar Nova Senha</label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-4 pr-12 py-3.5 outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        placeholder="••••••••"
                        type={mostrarConfirmarSenha ? "text" : "password"}
                        required
                        disabled={isLoading}
                      />
                      <button
                        className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        type="button"
                        onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                        aria-label={mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
                      >
                        <span className="material-symbols-outlined">
                          {mostrarConfirmarSenha ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <Botao type="submit" className="w-full py-4 h-14" disabled={isLoading || !token}>
                    {isLoading ? (
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                      'Salvar Nova Senha'
                    )}
                  </Botao>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
