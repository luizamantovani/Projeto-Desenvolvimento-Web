import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Botao } from '../components/ui/Botao';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula uma chamada de API profissional
    setTimeout(() => {
      setIsLoading(false);
      navigate('/progresso');
    }, 1500);
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 bg-white dark:bg-slate-900">
            <Link to="/" className="flex items-center gap-3 text-primary">
              <div className="size-8 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">auto_stories</span>
              </div>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Agendo</h2>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden md:block">
                <span className="text-sm text-slate-500">Novo no Agendo?</span>
                <Link className="ml-2 text-sm font-semibold text-primary hover:underline" to="/cadastro">Criar uma conta</Link>
              </div>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
              <div className="hidden lg:block relative overflow-hidden bg-primary/5">
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="h-full w-full bg-center bg-cover flex flex-col justify-end p-12 text-white relative z-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUv5RUlKhuYEemsUftof9eAlAhbimfSA7jdCgncBs3tryDWukLdA4DqqoMDY5e7MCjClcTjr0HfQFaMBijK2XPX1UmKAGPq2h3x7-sIUuLAmVFQQPW7WocPB-T9yANZVudjRHe3hQbQyS8xY9tFxW4knTOrfpza1udzJNAGE1vWbIbIj7hV1ZVcKAIdeR_01XAj8d9-z4hUMa99Sd8bt1o9krQirKVhecgig3R5OH07rO_KrXiZzLYcqtoRyEQ6hwa4TNKt-yuIuw")' }}>
                  <div className="relative z-10">
                    <h1 className="text-4xl font-black mb-4 leading-tight">Domine seus estudos com precisão.</h1>
                    <p className="text-lg text-slate-100 opacity-90">Junte-se a mais de 50.000 estudantes organizando sua vida acadêmica com o workspace inteligente do Agendo.</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-0"></div>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">Bem-vindo de Volta</h2>
                  <p className="text-slate-500 dark:text-slate-400">Faça login para continuar sua jornada de aprendizado</p>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Endereço de E-mail</label>
                    <input
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                      placeholder="estudante@universidade.edu"
                      type="email"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</label>
                      <a className="text-xs font-semibold text-primary hover:underline" href="#">Esqueceu a senha?</a>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                        placeholder="••••••••"
                        type="password"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" type="button">
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-1">
                    <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" id="lembrar" type="checkbox" />
                    <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="lembrar">Mantenha-me conectado</label>
                  </div>

                  <Botao type="submit" className="w-full py-4 h-14" disabled={isLoading}>
                    {isLoading ? (
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    ) : (
                      'Entrar'
                    )}
                  </Botao>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-900 px-4 text-slate-500">Ou continue com</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 rounded-lg py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span className="text-sm font-semibold">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 rounded-lg py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-xl text-slate-700 dark:text-slate-300">ios</span>
                    <span className="text-sm font-semibold">Apple</span>
                  </button>
                </div>

                <div className="mt-8 text-center lg:hidden">
                  <span className="text-sm text-slate-500">Novo no Agendo?</span>
                  <Link className="ml-1 text-sm font-semibold text-primary hover:underline" to="/cadastro">Criar uma conta</Link>
                </div>
              </div>
            </div>
          </main>

          <footer className="p-6 text-center text-slate-500 text-sm">
            <div className="flex justify-center gap-6 mb-2">
              <a className="hover:text-primary transition-colors" href="#">Central de Ajuda</a>
              <a className="hover:text-primary transition-colors" href="#">Termos de Serviço</a>
              <a className="hover:text-primary transition-colors" href="#">Política de Privacidade</a>
            </div>
            <p>© 2024 Agendo Academic Solutions. Todos os direitos reservados.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};
