import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ADIÇÃO: Hook de navegação
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
  const navigate = useNavigate(); // ADIÇÃO: Instância de navegação

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [materias, setMaterias] = useState([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([
    "Seg", "Ter", "Qua", "Qui", "Sex"
  ]);

  const [horarios, setHorarios] = useState<Horario[]>([
    { inicio: "08:00", fim: "12:00" },
    { inicio: "14:00", fim: "18:00" }
  ]);

  // ADIÇÃO: Estados para gerir o carregamento e os alertas
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);

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

  const enviarDados = async () => {
    const dados = montarDados();
    console.log("JSON FINAL:", JSON.stringify(dados, null, 2));
    setIsLoading(true);
    setAlertInfo(null);

    try {
      const resposta = await fetch('http://localhost:8080/cronogramas/gerar', {
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

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          Configurar Plano de Estudos
        </h1>
      </div>

      {alertInfo && (
        <div 
          className={`p-4 mb-6 rounded-lg text-white font-medium flex items-center justify-center ${
            alertInfo.tipo === 'sucesso' ? 'bg-emerald-500' : 'bg-red-500'
          }`}
        >
          {alertInfo.mensagem}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div className="w-full">
          <Calendar setDataSelecionada={setDataSelecionada} />
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
          onClick={enviarDados}
          disabled={isLoading} 
          className={`mt-8 w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg transition 
                     ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer active:opacity-50'}`}
        >
          {isLoading ? 'A gerar cronograma...' : 'Gerar Meu Cronograma'}
        </button>
      </div>
    </DashboardLayout>
  );
};