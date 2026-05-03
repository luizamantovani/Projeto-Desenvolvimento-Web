import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const Progresso: React.FC = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Progresso - Agendo</title>
        <meta name="description" content="Acompanhe sua evolução acadêmica e metas no Agendo." />
        <meta property="og:title" content="Progresso - Agendo" />
        <meta property="og:description" content="Acompanhe sua evolução acadêmica e metas no Agendo." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="mb-8">
        <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Acompanhamento de Progresso</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Visualize sua evolução acadêmica e alcance suas metas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Main Stats & Charts */}
        <div className="lg:col-span-8 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-xl">schedule</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Total de Horas</p>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold mt-1">120h</p>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+12% vs mês passado</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-xl">library_books</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Matérias Concluídas</p>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold mt-1">5/8</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2">
                <div className="bg-primary h-full rounded-full" style={{ width: '62.5%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-xl">bolt</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Foco Geral</p>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold mt-1">88%</p>
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <span>Pico de performance: 94%</span>
              </div>
            </div>
          </div>

          {/* Study Activity Chart */}
          <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Atividade de Estudo</h3>
                <p className="text-slate-500 text-sm">Últimos 7 Dias (Horas)</p>
              </div>
              <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm rounded-lg text-slate-600 dark:text-slate-300 px-3 py-1 outline-none">
                <option>Visão Semanal</option>
                <option>Visão Mensal</option>
              </select>
            </div>
            
            <div className="flex items-end justify-between h-[200px] gap-2 md:gap-4 px-2">
              {/* Mon */}
              <div className="flex flex-col items-center flex-1 gap-3">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: '60%' }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">4.2h</div>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: '80%' }}></div>
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase">Seg</span>
              </div>
              {/* Tue */}
              <div className="flex flex-col items-center flex-1 gap-3">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: '50%' }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: '70%' }}></div>
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase">Ter</span>
              </div>
              {/* Wed */}
              <div className="flex flex-col items-center flex-1 gap-3">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: '35%' }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: '60%' }}></div>
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase">Qua</span>
              </div>
              {/* Thu */}
              <div className="flex flex-col items-center flex-1 gap-3">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: '90%' }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: '95%' }}></div>
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase">Qui</span>
              </div>
              {/* Fri */}
              <div className="flex flex-col items-center flex-1 gap-3">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: '80%' }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: '85%' }}></div>
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase">Sex</span>
              </div>
              {/* Sat */}
              <div className="flex flex-col items-center flex-1 gap-3">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: '40%' }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: '40%' }}></div>
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase">Sáb</span>
              </div>
              {/* Sun */}
              <div className="flex flex-col items-center flex-1 gap-3">
                <div className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: '30%' }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-lg" style={{ height: '50%' }}></div>
                </div>
                <span className="text-slate-400 text-xs font-bold uppercase">Dom</span>
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6">Detalhamento por Matéria</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cálculo Avançado</span>
                  <span className="text-sm font-bold text-primary">75%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Psicologia Cognitiva</span>
                  <span className="text-sm font-bold text-primary">40%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Arquitetura Moderna</span>
                  <span className="text-sm font-bold text-primary">92%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Estruturas de Dados</span>
                  <span className="text-sm font-bold text-primary">58%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Achievements & Next Steps */}
        <div className="lg:col-span-4 space-y-6">
          {/* Next Milestone */}
          <div className="rounded-xl p-6 bg-primary text-white shadow-lg overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1">Próxima Conquista</h3>
              <p className="text-2xl font-black mb-4">Nível 5 - Empreendedor</p>
              <div className="bg-white/20 p-4 rounded-lg mb-4">
                <p className="text-sm mb-3">Estude <span className="font-bold">mais 10 horas</span> para desbloquear seu novo ranking e medalha exclusiva.</p>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <button className="w-full py-2 bg-white text-primary rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">Iniciar Sessão Agora</button>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 size-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* Milestones / Achievements */}
          <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">Conquistas</h3>
              <span className="text-primary text-xs font-bold uppercase cursor-pointer hover:underline">Ver Todas</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="size-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Sequência de 7 Dias</p>
                  <p className="text-xs text-slate-500">Estudou todos os dias desta semana</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <span className="material-symbols-outlined text-2xl">self_improvement</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Mestre do Foco</p>
                  <p className="text-xs text-slate-500">Sessão de 4h sem distrações</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 opacity-50">
                <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                  <span className="material-symbols-outlined text-2xl">military_tech</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Pontuação Perfeita</p>
                  <p className="text-xs text-slate-500">Completar todas as matérias (Bloqueado)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="rounded-xl p-6 bg-slate-900 text-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              <h3 className="font-bold">Dica Pro</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Você é mais produtivo nas <span className="text-white font-medium">Quintas-feiras entre 9:00 e 11:00</span>. Tente agendar suas matérias mais difíceis neste período!
            </p>
            <a className="text-xs font-bold text-primary hover:text-blue-400 transition-colors" href="#">Ver Insights de Produtividade →</a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
