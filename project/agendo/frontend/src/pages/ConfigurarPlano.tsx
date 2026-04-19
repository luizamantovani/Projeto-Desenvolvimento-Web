import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const ConfigurarPlano: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">Configurar Plano de Estudos</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-normal">Nossa IA gerará um cronograma equilibrado com base na data do seu exame e na dificuldade das matérias.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Date and General Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">event</span>
              Informações do Exame
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center p-1 justify-between mb-2">
                  <button className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-1 transition-colors">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <p className="text-slate-900 dark:text-slate-100 text-base font-bold flex-1 text-center">Outubro 2024</p>
                  <button className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-1 transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
                <div className="grid grid-cols-7 text-center">
                  <p className="text-slate-400 text-xs font-bold uppercase py-2">D</p>
                  <p className="text-slate-400 text-xs font-bold uppercase py-2">S</p>
                  <p className="text-slate-400 text-xs font-bold uppercase py-2">T</p>
                  <p className="text-slate-400 text-xs font-bold uppercase py-2">Q</p>
                  <p className="text-slate-400 text-xs font-bold uppercase py-2">Q</p>
                  <p className="text-slate-400 text-xs font-bold uppercase py-2">S</p>
                  <p className="text-slate-400 text-xs font-bold uppercase py-2">S</p>
                  
                  <div className="py-2 text-slate-300 dark:text-slate-600 text-sm">29</div>
                  <div className="py-2 text-slate-300 dark:text-slate-600 text-sm">30</div>
                  {Array.from({length: 14}).map((_, i) => (
                    <div key={i} className="py-2 text-slate-900 dark:text-slate-100 text-sm hover:bg-primary/10 rounded-lg cursor-pointer transition-colors">{i + 1}</div>
                  ))}
                  <div className="py-2 bg-primary text-white text-sm rounded-lg cursor-pointer shadow-lg shadow-primary/30">16</div>
                  {Array.from({length: 2}).map((_, i) => (
                    <div key={i+15} className="py-2 text-slate-900 dark:text-slate-100 text-sm hover:bg-primary/10 rounded-lg cursor-pointer transition-colors">{i + 17}</div>
                  ))}
                </div>
              </div>
              <label className="flex flex-col">
                <p className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1.5">Data Selecionada</p>
                <div className="relative">
                  <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm focus:ring-2 focus:ring-primary outline-none" readOnly type="text" value="16 de Out, 2024" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">calendar_month</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Subjects and Difficulty */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">list_alt</span>
              Matérias para Estudar
            </h3>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col gap-3">
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Nome da Matéria (ex: Cálculo Avançado)" type="text" />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Nível de Dificuldade</p>
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <input defaultChecked className="peer hidden" name="diff-1" type="radio" />
                        <div className="py-2 text-center rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-green-500/10 peer-checked:border-green-500 peer-checked:text-green-600 dark:peer-checked:text-green-400 text-xs font-medium transition-all">Fácil</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input className="peer hidden" name="diff-1" type="radio" />
                        <div className="py-2 text-center rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-amber-500/10 peer-checked:border-amber-500 peer-checked:text-amber-600 dark:peer-checked:text-amber-400 text-xs font-medium transition-all">Médio</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input className="peer hidden" name="diff-1" type="radio" />
                        <div className="py-2 text-center rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-red-500/10 peer-checked:border-red-500 peer-checked:text-red-600 dark:peer-checked:text-red-400 text-xs font-medium transition-all">Difícil</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col gap-3">
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" type="text" defaultValue="Física Teórica" />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Nível de Dificuldade</p>
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <input className="peer hidden" name="diff-2" type="radio" />
                        <div className="py-2 text-center rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-green-500/10 peer-checked:border-green-500 peer-checked:text-green-600 dark:peer-checked:text-green-400 text-xs font-medium transition-all">Fácil</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input className="peer hidden" name="diff-2" type="radio" />
                        <div className="py-2 text-center rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-amber-500/10 peer-checked:border-amber-500 peer-checked:text-amber-600 dark:peer-checked:text-amber-400 text-xs font-medium transition-all">Médio</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input defaultChecked className="peer hidden" name="diff-2" type="radio" />
                        <div className="py-2 text-center rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-red-500/10 peer-checked:border-red-500 peer-checked:text-red-600 dark:peer-checked:text-red-400 text-xs font-medium transition-all">Difícil</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-all font-medium text-sm">
                <span className="material-symbols-outlined">add</span>
                Adicionar Outra Matéria
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Availability Section */}
      <div className="mt-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">schedule</span>
            Disponibilidade Semanal
          </h3>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Selecione os dias de estudo</p>
              <div className="flex flex-wrap gap-2">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((dia, i) => (
                  <label key={i} className="cursor-pointer">
                    <input defaultChecked className="peer hidden" type="checkbox" />
                    <div className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white text-sm font-medium transition-all">{dia}</div>
                  </label>
                ))}
                {['Sáb', 'Dom'].map((dia, i) => (
                  <label key={i} className="cursor-pointer">
                    <input className="peer hidden" type="checkbox" />
                    <div className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white text-sm font-medium transition-all">{dia}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Horários disponíveis para os dias selecionados</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Aplicar as mesmas horas para todos os dias selecionados</span>
                </label>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-8">Das</span>
                    <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" type="time" defaultValue="08:00" />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-8">Às</span>
                    <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" type="time" defaultValue="12:00" />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-red-500">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-8">Das</span>
                    <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" type="time" defaultValue="14:00" />
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-8">Às</span>
                    <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" type="time" defaultValue="18:00" />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-red-500">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
              
              <button className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary transition-all text-xs font-bold flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span>
                Adicionar Horário
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <span className="material-symbols-outlined text-primary">auto_fix_high</span>
          </div>
          <div>
            <p className="text-slate-900 dark:text-slate-100 font-bold">Pronto para planejar?</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Organizaremos suas horas de estudo ao longo de 14 dias.</p>
          </div>
        </div>
        <button className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-base shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2">
          Gerar Meu Cronograma
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-3 p-4">
          <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Priorização Inteligente</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Matérias mais difíceis recebem mais foco durante suas horas de pico de concentração.</p>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <span className="material-symbols-outlined text-primary text-3xl">hourglass_empty</span>
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Gestão de Pausas</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pausas estilo Pomodoro são integradas automaticamente ao seu fluxo.</p>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <span className="material-symbols-outlined text-primary text-3xl">update</span>
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Atualizações Diárias</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Ajuste seu cronograma a qualquer momento conforme avança nos tópicos.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};
