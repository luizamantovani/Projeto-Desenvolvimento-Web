import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const Cronograma: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-8">
          {/* Left Side: Interactive Calendar */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Cronograma de Estudos</h2>
                <p className="text-slate-500 text-sm">Gerencie seus blocos de estudo semanais e sessões de foco profundo.</p>
              </div>
              <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                <button className="px-4 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-700">Dia</button>
                <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-primary text-white shadow-sm">Semana</button>
                <button className="px-4 py-1.5 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-700">Mês</button>
              </div>
            </div>

            {/* Subject Difficulty Legend */}
            <div className="flex gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Difícil (Foco Profundo)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Médio (Rotina)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Fácil (Revisão)</span>
              </div>
            </div>

            {/* Weekly Calendar Grid */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="p-4 text-center border-r border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Seg</p>
                  <p className="text-lg font-bold">16</p>
                </div>
                <div className="p-4 text-center border-r border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Ter</p>
                  <p className="text-lg font-bold">17</p>
                </div>
                <div className="p-4 text-center border-r border-slate-200 dark:border-slate-700 bg-primary/5">
                  <p className="text-[10px] font-bold text-primary uppercase">Qua</p>
                  <p className="text-lg font-bold text-primary">18</p>
                </div>
                <div className="p-4 text-center border-r border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Qui</p>
                  <p className="text-lg font-bold">19</p>
                </div>
                <div className="p-4 text-center border-r border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sex</p>
                  <p className="text-lg font-bold">20</p>
                </div>
                <div className="p-4 text-center border-r border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sáb</p>
                  <p className="text-lg font-bold">21</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Dom</p>
                  <p className="text-lg font-bold">22</p>
                </div>
              </div>

              <div className="grid grid-cols-7 h-[500px] overflow-y-auto">
                {/* Monday Column */}
                <div className="border-r border-slate-200 dark:border-slate-800 p-2 space-y-2 relative">
                  <div className="absolute inset-0 bg-slate-50/30 dark:bg-slate-800/10 h-full pointer-events-none"></div>
                  <div className="p-2 rounded-lg bg-orange-400/10 border-l-4 border-orange-400">
                    <p className="text-[10px] font-bold text-orange-600">09:00 - 10:30</p>
                    <p className="text-xs font-bold truncate">Princípios de SO</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-500/10 border-l-4 border-red-500">
                    <p className="text-[10px] font-bold text-red-600">14:00 - 16:00</p>
                    <p className="text-xs font-bold truncate">Cálculo III</p>
                  </div>
                </div>
                {/* Tuesday Column */}
                <div className="border-r border-slate-200 dark:border-slate-800 p-2 space-y-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border-l-4 border-emerald-500">
                    <p className="text-[10px] font-bold text-emerald-600">10:00 - 11:00</p>
                    <p className="text-xs font-bold truncate">Redação Técnica</p>
                  </div>
                </div>
                {/* Wednesday Column (Active) */}
                <div className="border-r border-slate-200 dark:border-slate-800 p-2 space-y-2 bg-primary/[0.02]">
                  <div className="p-2 rounded-lg bg-red-500/10 border-l-4 border-red-500 shadow-sm">
                    <p className="text-[10px] font-bold text-red-600">08:00 - 10:00</p>
                    <p className="text-xs font-bold truncate">Estruturas de Dados</p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-400/10 border-l-4 border-orange-400 shadow-sm opacity-50 ring-1 ring-orange-200">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-orange-600">11:30 - 13:00</p>
                      <span className="material-symbols-outlined text-[14px] text-orange-600">check_circle</span>
                    </div>
                    <p className="text-xs font-bold truncate">Matemática Discreta</p>
                  </div>
                  <div className="p-2 rounded-lg bg-primary border-l-4 border-white text-white shadow-lg scale-[1.02] transform transition">
                    <p className="text-[10px] font-bold text-blue-100">15:00 - 17:00</p>
                    <p className="text-xs font-bold truncate">Lab de Projetos (Agora)</p>
                  </div>
                </div>
                {/* Thursday Column */}
                <div className="border-r border-slate-200 dark:border-slate-800 p-2 space-y-2">
                  <div className="p-2 rounded-lg bg-red-500/10 border-l-4 border-red-500">
                    <p className="text-[10px] font-bold text-red-600">13:00 - 15:00</p>
                    <p className="text-xs font-bold truncate">Prep Algoritmos</p>
                  </div>
                </div>
                {/* Friday Column */}
                <div className="border-r border-slate-200 dark:border-slate-800 p-2 space-y-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border-l-4 border-emerald-500">
                    <p className="text-[10px] font-bold text-emerald-600">09:00 - 11:00</p>
                    <p className="text-xs font-bold truncate">Revisão Livre</p>
                  </div>
                </div>
                {/* Sat/Sun Columns */}
                <div className="border-r border-slate-200 dark:border-slate-800 p-2 bg-slate-50/50 dark:bg-slate-800/20"></div>
                <div className="p-2 bg-slate-50/50 dark:bg-slate-800/20"></div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Widgets */}
          <div className="w-80 space-y-6">
            {/* Today's Tasks */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Tarefas de Hoje</h3>
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">Faltam 3</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Ler Capítulo 4 de SO</p>
                    <p className="text-[10px] text-slate-500">Matéria: Sistemas • 45 min</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-primary bg-primary flex items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-white text-[16px]">check</span>
                  </div>
                  <div className="flex-1 opacity-50">
                    <p className="text-sm font-medium line-through">Trabalho de Matemática 2</p>
                    <p className="text-[10px] text-slate-500">Matéria: Cálculo III • Feito</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Rascunho do Projeto</p>
                    <p className="text-[10px] text-slate-500">Matéria: Lab de CC • 2h</p>
                  </div>
                </li>
              </ul>
              <button className="w-full mt-6 py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                + Adicionar Nova Tarefa
              </button>
            </div>

            {/* Upcoming Exams */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Próximos Exames</h3>
              <div className="space-y-3">
                <div className="group cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">Prova: Estruturas de Dados</p>
                    <span className="text-[10px] font-bold text-red-500 bg-red-100 px-1.5 py-0.5 rounded">3 dias</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Dificuldade: Difícil • 21 Out, 2024</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">Quiz: Matemática Discreta</p>
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-100 px-1.5 py-0.5 rounded">8 dias</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Dificuldade: Médio • 26 Out, 2024</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                <p className="text-[10px] font-bold text-primary uppercase">Horas de Estudo</p>
                <p className="text-2xl font-black">24.5</p>
                <p className="text-[10px] text-primary/60 mt-1">Esta semana</p>
              </div>
              <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Foco</p>
                <p className="text-2xl font-black">92%</p>
                <p className="text-[10px] text-emerald-600/60 mt-1">+4% vs semana pass.</p>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
};
