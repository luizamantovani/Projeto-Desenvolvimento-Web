import React from 'react';

export const Rodape: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-10 bg-white dark:bg-background-dark mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">© 2024 Agendo Academy. Transformando foco em resultados.</p>
        <div className="flex gap-6">
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Suporte</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Privacidade</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm" href="#">Termos</a>
        </div>
      </div>
    </footer>
  );
};
