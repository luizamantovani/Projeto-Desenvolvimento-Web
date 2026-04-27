import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';

interface Materia {
  id: number;
  nome: string;
  hex: string;
}

interface Sessao {
  id: number;
  data: string; 
  horaInicio: string; 
  horaFim: string; 
  concluido: boolean;
  status: string;
  materia: Materia;
}

type ViewMode = 'dia' | 'semana' | 'mes';

export const Cronograma: React.FC = () => {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('semana');

  useEffect(() => {
    const fetchCronograma = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('@Agendo:token'); 
        
        const resposta = await fetch('http://localhost:8080/cronogramas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!resposta.ok) throw new Error('Falha ao carregar o cronograma.');

        const data = await resposta.json();
        setSessoes(data);
      } catch {
        console.error('Não foi possível carregar seu cronograma.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCronograma();
  }, []);

  const formataDataIso = (data: Date) => {
    return new Date(data.getTime() - data.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  }

  const hoje = new Date();
  const hojeString = formataDataIso(hoje);

  const obterDiasVisualizacao = () => {
    if (viewMode === 'dia') return [hoje];

    if (viewMode === 'semana') {
      const diaDaSemana = hoje.getDay();
      const distanciaParaSegunda = diaDaSemana === 0 ? -6 : 1 - diaDaSemana; 
      const segundaFeira = new Date(hoje);
      segundaFeira.setDate(hoje.getDate() + distanciaParaSegunda);

      return Array.from({ length: 7 }).map((_, i) => {
        const data = new Date(segundaFeira);
        data.setDate(segundaFeira.getDate() + i);
        return data;
      });
    }

    if (viewMode === 'mes') {
      const ano = hoje.getFullYear();
      const mes = hoje.getMonth();
      const diasNoMes = new Date(ano, mes + 1, 0).getDate();
      const dias = Array.from({ length: diasNoMes }).map((_, i) => new Date(ano, mes, i + 1));
      
      const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
      const paddingInicio = primeiroDiaDaSemana === 0 ? 6 : primeiroDiaDaSemana - 1; 
      
      const padding: (Date | null)[] = Array(paddingInicio).fill(null);
      return [...padding, ...dias];
    }
    return [];
  };

  const diasVisualizacao = obterDiasVisualizacao();
  const nomesDosDias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const horasDoDia = Array.from({ length: 24 }).map((_, i) => `${i.toString().padStart(2, '0')}:00`);

  const horaParaPixels = (horaStr: string) => {
    const [horas, minutos] = horaStr.split(':').map(Number);
    return (horas * 60) + minutos; 
  };

  const duracaoParaPixels = (inicio: string, fim: string) => {
    return horaParaPixels(fim) - horaParaPixels(inicio);
  };

  const calcularDuracaoTexto = (inicio: string, fim: string) => {
    return `${inicio.slice(0, 5)} - ${fim.slice(0, 5)}`; 
  };

  const tarefasDeHoje = sessoes.filter(sessao => sessao.data === hojeString);
  const sessoesPendentes = tarefasDeHoje.filter(s => !s.concluido).length;

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
      
          <div className="flex-1 space-y-6 min-w-0">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Cronograma de Estudos</h2>
                <p className="text-slate-500 text-sm">Gerencie seus blocos de estudo semanais e sessões de foco profundo.</p>
              </div>
              <div className="flex w-full md:w-auto items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                <button onClick={() => setViewMode('dia')} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'dia' ? 'bg-primary text-white shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>Dia</button>
                <button onClick={() => setViewMode('semana')} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'semana' ? 'bg-primary text-white shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>Semana</button>
                <button onClick={() => setViewMode('mes')} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'mes' ? 'bg-primary text-white shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>Mês</button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="overflow-x-auto">
                <div className="min-w-150 lg:min-w-full flex flex-col">
                  <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    {viewMode !== 'mes' && <div className="w-16 shrink-0 border-r border-slate-200 dark:border-slate-800"></div>}
                    
                    <div className={`flex-1 grid ${viewMode === 'mes' ? 'grid-cols-7' : `grid-cols-${diasVisualizacao.length}`}`}>
                      {viewMode === 'mes' ? (
                        nomesDosDias.map((dia, idx) => (
                          <div key={dia} className={`p-3 text-center ${idx < 6 ? 'border-r border-slate-200 dark:border-slate-700' : ''}`}>
                            <p className="text-xs font-bold text-slate-400 uppercase">{dia}</p>
                          </div>
                        ))
                      ) : (
                        diasVisualizacao.map((dataObj, idx) => {
                          if(!dataObj) return null;
                          const numeroDoDia = dataObj.getDate();
                          const ehHoje = formataDataIso(dataObj) === hojeString;
                          const diaSemanaIndex = dataObj.getDay() === 0 ? 6 : dataObj.getDay() - 1;

                          return (
                            <div key={idx} className={`p-4 text-center ${idx < (diasVisualizacao.length - 1) ? 'border-r border-slate-200 dark:border-slate-700' : ''} ${ehHoje ? 'bg-primary/5' : ''}`}>
                              <p className={`text-[10px] font-bold uppercase ${ehHoje ? 'text-primary' : 'text-slate-400'}`}>{nomesDosDias[diaSemanaIndex]}</p>
                              <p className={`text-lg font-bold ${ehHoje ? 'text-primary' : ''}`}>{numeroDoDia}</p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="relative h-150 overflow-y-auto">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 z-50">
                        <p className="font-medium text-slate-500">Carregando cronograma...</p>
                      </div>
                    )}
                    
                    {viewMode === 'mes' && (
                      <div className="grid grid-cols-7 auto-rows-[100px]">
                        {!isLoading && diasVisualizacao.map((dataObj, idx) => {
                          if (!dataObj) return <div key={`empty-${idx}`} className="border-r border-b border-slate-200 dark:border-slate-800 p-2 bg-slate-50/30 dark:bg-slate-800/20"></div>;

                          const dataDaColuna = formataDataIso(dataObj);
                          const sessoesDoDia = sessoes.filter(s => s.data === dataDaColuna);

                          return (
                            <div key={dataDaColuna} className="border-r border-b border-slate-200 dark:border-slate-800 p-2 space-y-1 overflow-y-auto">
                              <p className={`text-xs text-right font-semibold mb-1 ${dataDaColuna === hojeString ? 'text-primary' : 'text-slate-500'}`}>{dataObj.getDate()}</p>
                              {sessoesDoDia.map(sessao => (
                                <div key={sessao.id} className="p-1 rounded text-[10px] font-bold truncate shadow-sm cursor-pointer"
                                  style={{ backgroundColor: `${sessao.materia.hex}1A`, color: sessao.materia.hex, borderLeft: `2px solid ${sessao.materia.hex}` }}
                                >
                                  {sessao.materia.nome}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {viewMode !== 'mes' && (
                      <div className="flex relative bg-white dark:bg-slate-900" style={{ height: '1440px' }}>
                        
                        <div className="w-16 shrink-0 border-r border-slate-200 dark:border-slate-800 relative bg-white dark:bg-slate-900 z-10">
                          {horasDoDia.map((hora) => (
                            <div key={hora} className="h-15 relative border-b border-transparent">
                              <span className="absolute -top-2.5 right-2 text-[10px] font-bold text-slate-400">{hora}</span>
                            </div>
                          ))}
                        </div>

                        <div className="absolute top-0 right-0 left-16 bottom-0 flex flex-col pointer-events-none">
                          {horasDoDia.map((hora) => (
                            <div key={hora} className="h-15 border-b border-slate-100 dark:border-slate-800/30"></div>
                          ))}
                        </div>

                        <div className="flex-1 flex relative">
                          {!isLoading && diasVisualizacao.map((dataObj, idx) => {
                            if (!dataObj) return null;
                            const dataDaColuna = formataDataIso(dataObj);
                            const sessoesDoDia = sessoes.filter(s => s.data === dataDaColuna);

                            return (
                              <div key={idx} className={`flex-1 relative border-r border-slate-100 dark:border-slate-800/30 ${dataDaColuna === hojeString ? 'bg-primary/1' : ''}`}>
                                {sessoesDoDia.map(sessao => {
                                  const topoPixels = horaParaPixels(sessao.horaInicio);
                                  const alturaPixels = duracaoParaPixels(sessao.horaInicio, sessao.horaFim);

                                  return (
                                    <div 
                                      key={sessao.id} 
                                      className="absolute left-1 right-1 rounded-lg shadow-sm p-2 flex flex-col justify-start overflow-hidden hover:scale-[1.01] transition-transform z-20 cursor-pointer"
                                      style={{ 
                                        top: `${topoPixels}px`, 
                                        height: `${alturaPixels}px`,
                                        borderLeft: `4px solid ${sessao.materia.hex || '#3b82f6'}`,
                                        backgroundColor: `${sessao.materia.hex}25`
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-bold leading-none" style={{ color: sessao.materia.hex }}>
                                          {calcularDuracaoTexto(sessao.horaInicio, sessao.horaFim)}
                                        </p>
                                        {sessao.concluido && (
                                          <span className="material-symbols-outlined text-[12px] leading-none" style={{ color: sessao.materia.hex }}>
                                            check_circle
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs font-bold truncate mt-1 leading-tight" title={sessao.materia.nome}>
                                        {sessao.materia.nome}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Tarefas de Hoje</h3>
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">
                  Faltam {sessoesPendentes}
                </span>
              </div>
              <ul className="space-y-4">
                {tarefasDeHoje.length === 0 && !isLoading && (
                   <p className="text-sm text-slate-500 text-center">Nenhuma tarefa para hoje!</p>
                )}
                {tarefasDeHoje.map(tarefa => (
                  <li key={tarefa.id} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors ${
                      tarefa.concluido ? 'bg-primary border-2 border-primary' : 'border-2 border-slate-300 dark:border-slate-600 hover:border-primary'
                    }`}>
                      {tarefa.concluido && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                    </div>
                    <div className={`flex-1 ${tarefa.concluido ? 'opacity-50' : ''}`}>
                      <p className={`text-sm font-medium ${tarefa.concluido ? 'line-through' : ''}`}>Sessão de {tarefa.materia.nome}</p>
                      <p className="text-[10px] text-slate-500">Das {calcularDuracaoTexto(tarefa.horaInicio, tarefa.horaFim)} • {tarefa.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                <p className="text-[10px] font-bold text-primary uppercase">Sessões Totais</p>
                <p className="text-2xl font-black">{sessoes.length}</p>
                <p className="text-[10px] text-primary/60 mt-1">Geradas</p>
              </div>
              <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Foco</p>
                <p className="text-2xl font-black">
                  {sessoes.length > 0 ? Math.round((sessoes.filter(s => s.concluido).length / sessoes.length) * 100) : 0}%
                </p>
                <p className="text-[10px] text-emerald-600/60 mt-1">Progresso geral</p>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
};