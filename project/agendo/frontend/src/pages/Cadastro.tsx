import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Botao } from '../components/ui/Botao';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [registro, setRegistro] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleCadastro = async( e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resposta = await fetch('http://localhost:8080/auth/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          registro
        )
      });
      if (resposta.ok) {
        console.log('Usuário registrado com sucesso!');
        setIsLoading(false);

      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-10 py-3 bg-white dark:bg-slate-900">
          <Link to="/" className="flex items-center gap-4">
            <div className="size-8 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">auto_stories</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Agendo</h2>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-[480px] space-y-8 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Criar Conta</h1>
              <p className="text-slate-500 dark:text-slate-400 text-base">Junte-se ao Agendo para começar a organizar sua jornada de aprendizado hoje mesmo.</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleCadastro}>
              <Input label="Nome Completo" value={registro.nome} onChange={(e) => setRegistro({ ...registro, nome: e.target.value })} placeholder="Digite seu nome completo" type="text" />
              <Input label="Endereço de E-mail" value={registro.email} onChange={(e) => setRegistro({ ...registro, email: e.target.value })} placeholder="nome@exemplo.com" type="email" />

              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Senha</label>
                <div className="relative flex items-center">
                  <input
                    className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-4 pr-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                    placeholder="Crie uma senha"
                    type="password"
                    value={registro.senha}
                    onChange={(e) => setRegistro({ ...registro, senha: e.target.value })}
                  />
                  <button className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Confirmar Senha</label>
                <div className="relative flex items-center">
                  <input
                    className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 pl-4 pr-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                    placeholder="Confirme sua senha"
                    type="password"
                  />
                  <button className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800" id="termos" type="checkbox" />
                <label className="text-sm text-slate-600 dark:text-slate-400 leading-snug" htmlFor="termos">
                  Concordo com os <a className="text-primary hover:underline font-medium" href="#">Termos de Serviço</a> e <a className="text-primary hover:underline font-medium" href="#">Política de Privacidade</a>.
                </label>
              </div>

              <Botao type="submit" className="h-12 w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    <span>Criar Conta</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </Botao>
            </form>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">ou</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Já tem uma conta?
                <Link className="text-primary font-bold hover:underline ml-1" to="/login">Entre aqui</Link>
              </p>
            </div>
          </div>
        </main>

        <footer className="px-6 py-8 text-center border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">© 2024 Agendo. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};
