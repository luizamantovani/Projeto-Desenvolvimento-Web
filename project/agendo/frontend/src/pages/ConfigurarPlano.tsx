import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import Materias from '../components/Materias';
import Calendar from '../components/Calender';
import Disponibility from '../components/Disponibility';
import { buscarConfiguracao, salvarConfiguracao } from '../service/configuracaoService';

const API_URL = import.meta.env.VITE_API_URL;

type Horario = {
  inicio: string;
  fim: string;
};

const diaParaNumero: Record<string, number> = {
  "Seg": 1,
  "Ter": 2,
  "Qua": 3,
  "Qui": 4,
  "Sex": 5,
  "Sáb": 6,
  "Dom": 7
};

const numeroParaDia: Record<number, string> = {
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
  7: "Dom"
};

export const ConfigurarPlano: React.FC = () => {
  const navigate = useNavigate();

  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [materias, setMaterias] = useState<any[]>([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([
    "Seg", "Ter", "Qua", "Qui", "Sex"
  ]);

  const [horarios, setHorarios] = useState<Horario[]>([
    { inicio: "08:00", fim: "12:00" },
    { inicio: "14:00", fim: "18:00" }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [alertInfo, setAlertInfo] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const carregarConfiguracao = async () => {
      try {
        const config = await buscarConfiguracao();
        if (config) {
          if (config.dataLimite) {
            const partes = config.dataLimite.split('-');
            setDataSelecionada(`${partes[2]}/${partes[1]}/${partes[0]}`);
          }

          if (config.diasSemanaDisponiveis && config.diasSemanaDisponiveis.length > 0) {
            const diasLabels = config.diasSemanaDisponiveis
              .map(num => numeroParaDia[num])
              .filter(Boolean);
            setDiasSelecionados(diasLabels);
          }

          if (config.turnos && config.turnos.length > 0) {
            setHorarios(config.turnos.map(t => ({
              inicio: t.inicio.slice(0, 5),
              fim: t.fim.slice(0, 5)
            })));
          }

          if (config.materias && config.materias.length > 0) {
            setMaterias(config.materias.map((m, i) => ({
              id: Date.now() + i,
              nome: m.nome,
              dificuldade: m.dificuldade,
              importancia: m.importancia,
              hex: m.hex || '#3B82F6'
            })));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar configuração salva:', error);
      } finally {
        setIsLoadingConfig(false);
      }
    };

    carregarConfiguracao();
  }, []);

  const montarDados = () => {
    const diasNumeros = diasSelecionados
      .map(dia => diaParaNumero[dia])
      .filter((num): num is number => num !== undefined);

    let dataFormatada = dataSelecionada;
    if (dataSelecionada && dataSelecionada.includes('/')) {
      const partes = dataSelecionada.split('/');
      dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    return {
      dataLimite: dataFormatada,
      diasSemanaDisponiveis: diasNumeros,
      turnos: horarios,
      materias: materias
    };
  };

  const verificarEGerar = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('@Agendo:token');
      const resposta = await fetch(`${API_URL}/cronogramas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (resposta.ok) {
        const data = await resposta.json();
        if (data && data.length > 0) {
          setShowWarningModal(true);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error('Erro ao verificar cronograma existente', e);
    }
    enviarDados();
  };

  const enviarDados = async () => {
    const dados = montarDados();
    console.log("JSON FINAL:", JSON.stringify(dados, null, 2));
    setIsLoading(true);
    setAlertInfo(null);

    try {
      await salvarConfiguracao(dados);

      const resposta = await fetch(`${API_URL}/cronogramas/gerar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@Agendo:token')}`
        },
        body: JSON.stringify(dados)
      });
      
      if (!resposta.ok) {
        throw new Error('Erro ao criar cronograma');
      }
      
      const data = await resposta.json();
      console.log('Cronograma criado com sucesso:', data);

      setAlertInfo({ tipo: 'sucesso', mensagem: 'Cronograma gerado com sucesso! A redirecionar...' });
      setTimeout(() => {
        navigate('/cronograma');
      }, 1500);

    } catch (error) {
      console.error('Erro ao criar cronograma:', error);
      
      setAlertInfo({ tipo: 'erro', mensagem: 'Falha ao gerar o seu cronograma. Tente novamente.' });
      setIsLoading(false);
    }
  };

  if (isLoadingConfig) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="font-medium text-slate-500">Carregando configuração...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Configurar Plano - Agendo</title>
        <meta name="description" content="Configure seu plano de estudos ideal definindo metas e horários." />
        <meta property="og:title" content="Configurar Plano - Agendo" />
        <meta property="og:description" content="Configure seu plano de estudos ideal definindo metas e horários." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          Configurar Plano de Estudos
        </h1>
      </div>

      {alertInfo && (
        <div 
          className={`fixed top-4 left-4 right-4 md:top-20 md:left-auto md:right-6 md:w-auto z-110 p-4 rounded-xl text-white font-bold shadow-2xl flex items-center gap-3 animate-in slide-in-from-top md:slide-in-from-right duration-300 ${
            alertInfo.tipo === 'sucesso' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-red-500 shadow-red-500/20'
          }`}
        >
          <span className="material-symbols-outlined">
            {alertInfo.tipo === 'sucesso' ? 'check_circle' : 'error'}
          </span>
          {alertInfo.mensagem}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div className="w-full">
          <Calendar dataSelecionada={dataSelecionada} setDataSelecionada={setDataSelecionada} />
        </div>

        <div className="w-full">
          <Materias materias={materias} setMaterias={setMaterias} />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Disponibility
          diasSelecionados={diasSelecionados}
          setDiasSelecionados={setDiasSelecionados}
          horarios={horarios}
          setHorarios={setHorarios}
        />
      </div>


      <div className="flex justify-center">
        <button
          onClick={verificarEGerar}
          disabled={isLoading} 
          className={`mt-8 w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg transition 
                     ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer active:opacity-50'}`}
        >
          {isLoading ? 'A gerar cronograma...' : 'Gerar Meu Cronograma'}
        </button>
      </div>

      {showWarningModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden transform animate-in zoom-in-95 duration-200 p-6">
            <div className="flex items-center gap-4 text-red-500 mb-4">
              <span className="material-symbols-outlined text-4xl">warning</span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Aviso Importante</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Você já possui um cronograma gerado. Se você prosseguir, o sistema irá <strong>apagar todos os dados do seu cronograma atual</strong>, incluindo todas as sessões que você já concluiu. 
              <br/><br/>
              Tem certeza que deseja continuar?
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setShowWarningModal(false);
                  enviarDados();
                }}
                className="px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
              >
                Sim, desejo continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};