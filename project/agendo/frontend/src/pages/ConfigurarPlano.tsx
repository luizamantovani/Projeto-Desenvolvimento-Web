import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import Materias from '../components/Materias';
import Calendar from '../components/Calender';
import Disponibility from '../components/Disponibility';

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

export const ConfigurarPlano: React.FC = () => {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [materias, setMaterias] = useState([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([
    "Seg", "Ter", "Qua", "Qui", "Sex"
  ]);

  const [horarios, setHorarios] = useState<Horario[]>([
    { inicio: "08:00", fim: "12:00" },
    { inicio: "14:00", fim: "18:00" }
  ]);

  const montarDados = () => {
    const diasNumeros = diasSelecionados
      .map(dia => diaParaNumero[dia])
      .filter((num): num is number => num !== undefined);

    return {
      dataLimite: dataSelecionada,
      materias: materias,
      diasSemanaDisponiveis: {
        dias: diasNumeros,
        horarios: horarios
      }
    };
  };

  const enviarDados = () => {
    const dados = montarDados();
    console.log("JSON FINAL:", JSON.stringify(dados, null, 2));
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          Configurar Plano de Estudos
        </h1>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div className="w-full">
          <Calendar setDataSelecionada={setDataSelecionada} />
        </div>

        <div className="w-full">
          <Materias materias={materias} setMaterias={setMaterias} />
        </div>
      </div>

      {/* DISPONIBILIDADE */}
      <div className="w-full overflow-x-auto">
        <Disponibility
          diasSelecionados={diasSelecionados}
          setDiasSelecionados={setDiasSelecionados}
          horarios={horarios}
          setHorarios={setHorarios}
        />
      </div>

      {/* BOTÃO FINAL */}
      <div className="flex justify-center">
        <button
          onClick={enviarDados}
          className="mt-8 w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg cursor-pointer 
                     active:opacity-50 transition"
        >
          Gerar Meu Cronograma
        </button>
      </div>
    </DashboardLayout>
  );
};