import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
  // Nova prop opcional para receber os dados de qualquer página
  progresso?: {
    total: number;
    concluidas: number;
    percentual: number;
  };
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, progresso }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const user = localStorage.getItem('@Agendo:user');
  const userName = user ? JSON.parse(user).nome : 'Usuário';

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

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
          {/* <Link
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/progresso') ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            to="/progresso"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="hidden md:inline">Dashboard</span>
          </Link> */}
          <Link
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/cronograma') ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            to="/cronograma"
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="hidden md:inline">Cronograma</span>
          </Link>
          {/* <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-outlined">book</span>
            <span className="hidden md:inline">Cursos</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
            <span className="material-symbols-outlined">folder</span>
            <span className="hidden md:inline">Recursos</span>
          </a> */}
          <Link
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/configurar') ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            to="/configurar"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="hidden md:inline">Configurações</span>
          </Link>
        </nav>
        
        {/* Nova seção dinâmica do Rastreador de Progresso */}
        <div className="hidden md:block p-4 mt-auto">
          {/* Só exibe o card se a página atual enviar a prop 'progresso' */}
          {progresso && (
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Rastreador de Progresso</p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Meta Semanal</span>
                <span className="text-sm font-bold text-primary">{progresso.percentual}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progresso.percentual}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">{progresso.concluidas}/{progresso.total} blocos concluídos</p>
            </div>
          )}
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
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
              
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors focus:outline-none group"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold leading-none">{userName}</p>
                  </div>
                  <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {isMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 sm:hidden">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Usuário</p>
                        <p className="text-sm font-bold truncate">{userName}</p>
                      </div>
                      <button 
                        className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                        onClick={() => { setIsMenuOpen(false); }}
                      >
                        <span className="material-symbols-outlined text-[20px] text-slate-400">account_circle</span>
                        Ver Perfil
                      </button>
                      <button 
                        className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors border-t border-slate-100 dark:border-slate-800"
                        onClick={handleLogout}
                      >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Sair da Conta
                      </button>
                    </div>
                  </>
                )}
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
