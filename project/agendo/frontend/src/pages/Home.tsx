import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Botao } from '../components/ui/Botao';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export const Home: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200">
      <Helmet>
        <title>Agendo - O seu Planejador de Estudos Inteligente</title>
        <meta name="description" content="Pare de se estressar com o que estudar e quando. O Agendo organiza seu cronograma de estudos." />
        <meta property="og:title" content="Agendo - O seu Planejador de Estudos Inteligente" />
        <meta property="og:description" content="Pare de se estressar com o que estudar e quando. O Agendo organiza seu cronograma de estudos." />
        <meta property="og:type" content="website" />
      </Helmet>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/logo-full.png" alt="Agendo Logo" className="h-8 md:h-10 w-auto object-contain" />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#recursos">Recursos</a>
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#como-funciona">Como Funciona</a>
              <a className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#planos">Planos</a>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium" to="/login">Entrar</Link>
              <Link className="hidden md:block" to="/cadastro">
                <Botao className="px-3 py-2 text-sm hover:bg-blue-600 cursor-pointer hover:text-white dark:hover:text-white" >Começar Agora</Botao>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Domine seus Estudos com um <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Planejamento Eficaz</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Pare de se estressar com o que estudar e quando. O Agendo é a ferramenta de gestão que organiza seu cronograma com base na sua disponibilidade e prioridades.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-md font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center" to="/cadastro">
              Estude de Forma Inteligente
              <span className="material-icons ml-2">arrow_forward</span>
            </Link>
            <a className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 px-8 py-3.5 rounded-md font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center justify-center" href="#recursos">
              Ver Funcionalidades
            </a>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-800/50" id="recursos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Por que Agendo?</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Tudo o que você precisa para vencer as provas</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Nossa solução completa para estudos permite que você organize seu conteúdo, ajuste seus horários e defina seu próprio ritmo de aprendizado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-6">
                <span className="material-icons text-primary text-3xl">calendar_month</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Agendamento Sob Controle</h4>
              <p className="text-slate-600 dark:text-slate-400">Insira seu tempo livre e datas de exames. Você define os blocos de estudo ideais para cobrir todo o material sem sobrecarga.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-6">
                <span className="material-icons text-green-600 dark:text-green-400 text-3xl">insights</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Acompanhamento de Progresso</h4>
              <p className="text-slate-600 dark:text-slate-400">Visualize seu domínio sobre cada matéria. Saiba exatamente onde você está, o que precisa de revisão e celebre suas conquistas.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
                <span className="material-icons text-purple-600 dark:text-purple-400 text-3xl">tune</span>
              </div>
              <h4 className="text-xl font-bold mb-3">Prioridade Personalizada</h4>
              <p className="text-slate-600 dark:text-slate-400">Identifique os tópicos mais difíceis para você. O sistema ajuda você a alocar manualmente mais tempo para temas complexos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para assumir o controle dos seus estudos?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Junte-se a milhares de estudantes que estão organizando sua rotina com simplicidade e eficiência usando o Agendo.</p>
          <Link className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg" to="/cadastro">
            Criar Minha Conta Gratuita
            <span className="material-icons ml-2">rocket_launch</span>
          </Link>
        </div>
      </section>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo-full.png" alt="Agendo Logo" className="h-8 md:h-10 w-auto object-contain" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Empoderando estudantes com ferramentas de gestão para melhores notas e menos estresse.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Produto</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">Recursos</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Preços</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Casos de Uso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Recursos</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Dicas de Estudo</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Central de Ajuda</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Empresa</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">Sobre Nós</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contato</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">© 2024 Agendo Inc. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
