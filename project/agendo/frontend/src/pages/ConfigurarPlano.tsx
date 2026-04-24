import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import Materias from '../components/Materias';
import Calendar from '../components/Calender';
import Disponibility from '../components/Disponibility';

type Horario = {
  id: number;
  inicio: string;
  fim: string;
};

export const ConfigurarPlano: React.FC = () => {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [materias, setMaterias] = useState([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([
    "Seg", "Ter", "Qua", "Qui", "Sex"
  ]);

  const [horarios, setHorarios] = useState<Horario[]>([
    { id: 1, inicio: "08:00", fim: "12:00" },
    { id: 2, inicio: "14:00", fim: "18:00" }
  ]);


  const montarDados = () => {
    return {
      dataExame: dataSelecionada,
      materias: materias,
      disponibilidade: {
        dias: diasSelecionados,
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
    <div className="flex flex-col gap-4 mb-8">
      <h1 className="text-4xl font-black">Configurar Plano de Estudos</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div><Calendar setDataSelecionada={setDataSelecionada} /></div>

      <Materias materias={materias} setMaterias={setMaterias} />
    </div>

    <Disponibility
      diasSelecionados={diasSelecionados}
      setDiasSelecionados={setDiasSelecionados}
      horarios={horarios}
      setHorarios={setHorarios}
    />

    {/* BOTÃO FINAL */}
    <button
      onClick={enviarDados}
      className="mt-8 px-6 py-3 bg-primary text-white rounded-lg"
    >
      Gerar Meu Cronograma
    </button>
  </DashboardLayout>
);
};