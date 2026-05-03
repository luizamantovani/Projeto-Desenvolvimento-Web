import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Cabecalho: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-4 text-primary">
        <img src="/logo-full.png" alt="Agendo Logo" className="h-8 md:h-10 w-auto object-contain" />
      </Link>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/progresso">Dashboard</Link>
          <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/configurar">Configurar</Link>
          <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" to="/cronograma">Cronograma</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button aria-label="Configurações" className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
          <div className="bg-slate-200 dark:bg-slate-700 rounded-full size-10 overflow-hidden border-2 border-primary/20 flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
