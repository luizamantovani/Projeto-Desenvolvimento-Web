import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 text-primary">
            <div className="bg-primary rounded-lg p-2 text-white">
              <span className="material-symbols-outlined block">auto_stories</span>
            </div>
            <h1 className="hidden md:block text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Agendo
            </h1>         
          </Link>
        </div>
        <nav className="flex-1 px-2 md:px-4 space-y-2">
          <Link
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/progresso') ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            to="/progresso"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/cronograma') ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            to="/cronograma"
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="hidden md:inline">Cronograma</span>
          </Link>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-outlined">book</span>
            <span className="hidden md:inline">Cursos</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-outlined">folder</span>
            <span className="hidden md:inline">Recursos</span>
          </a>
          <Link
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/configurar') ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            to="/configurar"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="hidden md:inline">Configurações</span>
          </Link>
        </nav>
        <div className="hidden md:block p-4 mt-auto">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Rastreador de Progresso</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Meta Semanal</span>
              <span className="text-sm font-bold text-primary">75%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">12/16 blocos concluídos</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-40 sm:w-64 md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm outline-none" placeholder="Pesquisar tarefas, notas ou exames..." type="text" />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold leading-none">Alex Johnson</p>
                <p className="text-[11px] text-slate-500">Ciência da Computação</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
