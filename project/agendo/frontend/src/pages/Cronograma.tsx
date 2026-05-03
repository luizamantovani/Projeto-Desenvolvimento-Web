import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from '../components/layout/DashboardLayout';

const API_URL = import.meta.env.VITE_API_URL;

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
  const [sessaoSelecionada, setSessaoSelecionada] = useState<Sessao | null>(null);
  const [currentViewDate, setCurrentViewDate] = useState(new Date());

  useEffect(() => {
    const fetchCronograma = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('@Agendo:token');

        const resposta = await fetch(`${API_URL}/cronogramas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!resposta.ok) throw new Error('Falha ao carregar o cronograma.');

        const data = await resposta.json();
        setSessoes(data);
      } catch (error) {
        console.error('Não foi possível carregar seu cronograma.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCronograma();
  }, []);

  const alternarStatusSessao = async (sessaoId: number) => {
    setSessoes(sessoesAtuais =>
      sessoesAtuais.map(sessao => {
        if (sessao.id === sessaoId) {
          const novoStatus = sessao.status === 'CONCLUIDA' ? 'PENDENTE' : 'CONCLUIDA';
          return { ...sessao, status: novoStatus, concluido: novoStatus === 'CONCLUIDA' };
        }
        return sessao;
      })
    );

    try {
      const token = localStorage.getItem('@Agendo:token');

      // Ajuste o endpoint se a sua rota base for diferente (ex: /cronogramas/... em vez de /sessoes/...)
      const resposta = await fetch(`${API_URL}/cronogramas/${sessaoId}/concluir`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!resposta.ok) {
        throw new Error('Falha ao atualizar o status no banco de dados.');
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao atualizar o status da sessão. Por favor, tente novamente.');
    }
  };

  const formataDataIso = (data: Date) => {
    return new Date(data.getTime() - data.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  }

  const hoje = new Date();
  const hojeString = formataDataIso(hoje);

  const obterDiasVisualizacao = () => {
    if (viewMode === 'dia') return [currentViewDate];

    if (viewMode === 'semana') {
      const diaDaSemana = currentViewDate.getDay();
      const distanciaParaSegunda = diaDaSemana === 0 ? -6 : 1 - diaDaSemana;
      const segundaFeira = new Date(currentViewDate);
      segundaFeira.setDate(currentViewDate.getDate() + distanciaParaSegunda);

      return Array.from({ length: 7 }).map((_, i) => {
        const data = new Date(segundaFeira);
        data.setDate(segundaFeira.getDate() + i);
        return data;
      });
    }

    if (viewMode === 'mes') {
      const ano = currentViewDate.getFullYear();
      const mes = currentViewDate.getMonth();
      const diasNoMes = new Date(ano, mes + 1, 0).getDate();
      const dias = Array.from({ length: diasNoMes }).map((_, i) => new Date(ano, mes, i + 1));

      const primeiroDiaDaSemana = new Date(ano, mes, 1).getDay();
      const paddingInicio = primeiroDiaDaSemana === 0 ? 6 : primeiroDiaDaSemana - 1;

      const padding: (Date | null)[] = Array(paddingInicio).fill(null);
      return [...padding, ...dias];
    }
    return [];
  };

  const navegarAnterior = () => {
    const novaData = new Date(currentViewDate);
    if (viewMode === 'dia') novaData.setDate(novaData.getDate() - 1);
    else if (viewMode === 'semana') novaData.setDate(novaData.getDate() - 7);
    else if (viewMode === 'mes') novaData.setMonth(novaData.getMonth() - 1);
    setCurrentViewDate(novaData);
  };

  const navegarProximo = () => {
    const novaData = new Date(currentViewDate);
    if (viewMode === 'dia') novaData.setDate(novaData.getDate() + 1);
    else if (viewMode === 'semana') novaData.setDate(novaData.getDate() + 7);
    else if (viewMode === 'mes') novaData.setMonth(novaData.getMonth() + 1);
    setCurrentViewDate(novaData);
  };

  const voltarParaHoje = () => {
    setCurrentViewDate(new Date());
  };

  const obterLabelPeriodo = (): string => {
    const opcoesMes: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    if (viewMode === 'dia') {
      return currentViewDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
    if (viewMode === 'semana') {
      const dias = obterDiasVisualizacao();
      const primeiro = dias[0];
      const ultimo = dias[dias.length - 1];
      if (!primeiro || !ultimo) return '';
      const fmtDia = (d: Date) => d.getDate().toString().padStart(2, '0');
      const fmtMes = (d: Date) => d.toLocaleDateString('pt-BR', { month: 'short' });
      if (primeiro.getMonth() === ultimo.getMonth()) {
        return `${fmtDia(primeiro)} – ${fmtDia(ultimo)} de ${fmtMes(primeiro)} ${primeiro.getFullYear()}`;
      }
      return `${fmtDia(primeiro)} ${fmtMes(primeiro)} – ${fmtDia(ultimo)} ${fmtMes(ultimo)} ${ultimo.getFullYear()}`;
    }
    return currentViewDate.toLocaleDateString('pt-BR', opcoesMes);
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

  const estatisticas = React.useMemo(() => {
    const totalSessoes = sessoes.length;
    const concluidas = sessoes.filter(s => s.status === 'CONCLUIDA').length;

    // Percentagem Geral
    const percentagemGeral = totalSessoes > 0
      ? Math.round((concluidas / totalSessoes) * 100)
      : 0;

    // Estatísticas de Hoje
    const sessoesHoje = sessoes.filter(s => s.data === hojeString);
    const totalHoje = sessoesHoje.length;
    const concluidasHoje = sessoesHoje.filter(s => s.status === 'CONCLUIDA').length;
    const percentagemHoje = totalHoje > 0
      ? Math.round((concluidasHoje / totalHoje) * 100)
      : 0;

    return {
      totalSessoes,
      concluidas,
      percentagemGeral,
      totalHoje,
      concluidasHoje,
      percentagemHoje
    };
  }, [sessoes, hojeString]);

  return (
    <DashboardLayout
      progresso={{
        total: estatisticas.totalSessoes,
        concluidas: estatisticas.concluidas,
        percentual: estatisticas.percentagemGeral
      }}
    >
      <Helmet>
        <title>Cronograma - Agendo</title>
        <meta name="description" content="Gerencie seus blocos de estudo semanais e sessões de foco profundo." />
        <meta property="og:title" content="Cronograma - Agendo" />
        <meta property="og:description" content="Gerencie seus blocos de estudo semanais e sessões de foco profundo." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">Cronograma de Estudos</h1>
                <p className="text-slate-500 text-xs sm:text-sm">Gerencie seus blocos de estudo e sessões de foco profundo.</p>
              </div>
              <div className="flex w-full sm:w-auto items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                <button onClick={() => setViewMode('dia')} className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${viewMode === 'dia' ? 'bg-primary text-white shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>Dia</button>
                <button onClick={() => setViewMode('semana')} className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${viewMode === 'semana' ? 'bg-primary text-white shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>Semana</button>
                <button onClick={() => setViewMode('mes')} className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${viewMode === 'mes' ? 'bg-primary text-white shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>Mês</button>
              </div>
            </div>

          {/* Navegação entre períodos */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <button
                onClick={navegarAnterior}
                className="p-1 sm:p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Período anterior"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">chevron_left</span>
              </button>
              <button
                onClick={navegarProximo}
                className="p-1 sm:p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Próximo período"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">chevron_right</span>
              </button>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold capitalize ml-1 sm:ml-2 truncate">{obterLabelPeriodo()}</h2>
            </div>
            <button
              onClick={voltarParaHoje}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              Hoje
            </button>
          </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="overflow-x-auto">
              <div className={`${viewMode === 'mes' ? 'min-w-125' : 'min-w-150'} lg:min-w-full flex flex-col`}>
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
                        if (!dataObj) return null;
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

                <div className="relative h-125 sm:h-150 overflow-y-auto">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 z-50">
                      <p className="font-medium text-slate-500">Carregando cronograma...</p>
                    </div>
                  )}

                  {viewMode === 'mes' && (
                    <div className="grid grid-cols-7 auto-rows-[80px] sm:auto-rows-[100px]">
                      {!isLoading && diasVisualizacao.map((dataObj, idx) => {
                        if (!dataObj) return <div key={`empty-${idx}`} className="border-r border-b border-slate-200 dark:border-slate-800 p-2 bg-slate-50/30 dark:bg-slate-800/20"></div>;

                        const dataDaColuna = formataDataIso(dataObj);
                        const sessoesDoDia = sessoes.filter(s => s.data === dataDaColuna);

                        return (
                          <div key={dataDaColuna} className="border-r border-b border-slate-200 dark:border-slate-800 p-2 space-y-1 overflow-y-auto">
                            <p className={`text-xs text-right font-semibold mb-1 ${dataDaColuna === hojeString ? 'text-primary' : 'text-slate-500'}`}>{dataObj.getDate()}</p>
                            {sessoesDoDia.map(sessao => (
                              <div
                                key={sessao.id}
                                className="p-1 rounded text-[10px] font-bold truncate shadow-sm cursor-pointer"
                                style={{ backgroundColor: `${sessao.materia.hex}1A`, color: sessao.materia.hex, borderLeft: `2px solid ${sessao.materia.hex}` }}
                                onClick={() => setSessaoSelecionada(sessao)}
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
                                    onClick={() => setSessaoSelecionada(sessao)}
                                    className="absolute inset-x-0.5 sm:inset-x-1 flex flex-col gap-0.5 overflow-hidden rounded-r-lg rounded-l-sm border border-slate-200 dark:border-slate-700/50 p-1.5 sm:p-2 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer group z-20"
                                    style={{
                                      top: `${topoPixels}px`,
                                      height: `${alturaPixels}px`,
                                      minHeight: '48px', // Impede que o bloco fique esmagado
                                      backgroundColor: `${sessao.materia.hex}15`, // Fundo mais suave
                                      borderLeftWidth: '4px',
                                      borderLeftColor: sessao.materia.hex || '#3b82f6',
                                    }}
                                  >
                                    {/* Header do Bloco: Nome da Matéria + Ícone */}
                                    <div className="flex w-full items-start justify-between">
                                      <span
                                        className="truncate text-[11px] sm:text-sm font-bold leading-tight"
                                        style={{ color: sessao.materia.hex }}
                                        title={sessao.materia.nome}
                                      >
                                        {sessao.materia.nome}
                                      </span>

                                      {sessao.concluido && (
                                        <span className="material-symbols-outlined text-[16px] leading-none mt-0.5" style={{ color: sessao.materia.hex }}>
                                          check_circle
                                        </span>
                                      )}
                                    </div>

                                    {/* Horário */}
                                    <div
                                      className="flex items-center text-[9px] sm:text-[11px] font-medium opacity-80 group-hover:opacity-100 transition-opacity"
                                      style={{ color: sessao.materia.hex }}
                                    >
                                      <span>
                                        {calcularDuracaoTexto(sessao.horaInicio, sessao.horaFim)}
                                      </span>
                                    </div>
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

        <div className="w-full lg:w-80 shrink-0 space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
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
                  <div
                    onClick={() => alternarStatusSessao(tarefa.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors ${tarefa.status === 'CONCLUIDA' ? 'bg-primary border-2 border-primary' : 'border-2 border-slate-300'
                      }`}
                  >
                    {tarefa.status === 'CONCLUIDA' && (
                      <span className="material-symbols-outlined text-white text-[16px]">check</span>
                    )}
                  </div>
                  <div className={`flex-1 ${tarefa.status === 'CONCLUIDA' ? 'opacity-50' : ''}`}>
                    <p className={`text-sm font-medium ${tarefa.status === 'CONCLUIDA' ? 'line-through' : ''}`}>
                      Sessão de {tarefa.materia.nome}
                    </p>
                    <p className="text-[10px] text-slate-500">Das {calcularDuracaoTexto(tarefa.horaInicio, tarefa.horaFim)} • {tarefa.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
              <p className="text-[10px] font-bold text-primary uppercase">Sessões Totais</p>
              <p className="text-2xl font-black">{estatisticas.totalSessoes}</p>
              <p className="text-[10px] text-primary/60 mt-1">Geradas no total</p>
            </div>
            <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Progresso Geral</p>
              <p className="text-2xl font-black">{estatisticas.percentagemGeral}%</p>
              <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${estatisticas.percentagemGeral}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {sessaoSelecionada && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com a cor da matéria */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: sessaoSelecionada.materia.hex }}
            />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Detalhes da Sessão
                  </h3>
                  <p className="text-sm text-slate-500">Informações detalhadas do seu bloco de foco.</p>
                </div>
                <button
                  aria-label="Fechar"
                  onClick={() => setSessaoSelecionada(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: sessaoSelecionada.materia.hex }}
                  >
                    <span className="material-symbols-outlined">book</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matéria</p>
                    <p className="font-bold text-slate-700 dark:text-slate-200">{sessaoSelecionada.materia.nome}</p>
                  </div>
                </div>

                {/* Grid de 3 colunas para acomodar a Data, Horário e Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Data</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {/* Formata a data de YYYY-MM-DD para DD/MM/YYYY */}
                      {sessaoSelecionada.data ? sessaoSelecionada.data.split('-').reverse().join('/') : '---'}
                    </p>
                  </div>

                  <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Horário</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {sessaoSelecionada.horaInicio.slice(0, 5)} - {sessaoSelecionada.horaFim.slice(0, 5)}
                    </p>
                  </div>

                  <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col justify-center items-start">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${sessaoSelecionada.status === 'CONCLUIDA'
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                      : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}>
                      {sessaoSelecionada.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    alternarStatusSessao(sessaoSelecionada.id);
                    setSessaoSelecionada(null); // Fecha após marcar
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${sessaoSelecionada.status === 'CONCLUIDA'
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    : 'bg-primary text-white hover:bg-primary-dark shadow-primary/20'
                    }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {sessaoSelecionada.status === 'CONCLUIDA' ? 'restart_alt' : 'check_circle'}
                  </span>
                  {sessaoSelecionada.status === 'CONCLUIDA' ? 'Refazer Sessão' : 'Marcar como Concluída'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};