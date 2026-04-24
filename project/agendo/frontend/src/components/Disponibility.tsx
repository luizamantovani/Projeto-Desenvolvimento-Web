type Horario = {
  id: number;
  inicio: string;
  fim: string;
};

type Props = {
  diasSelecionados: string[];
  setDiasSelecionados: React.Dispatch<React.SetStateAction<string[]>>;
  horarios: Horario[];
  setHorarios: React.Dispatch<React.SetStateAction<Horario[]>>;
};

export default function Disponibility({
  diasSelecionados,
  setDiasSelecionados,
  horarios,
  setHorarios
}: Props) {

  const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const toggleDia = (dia: string) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  const adicionarHorario = () => {
    setHorarios((prev) => [
      ...prev,
      { id: Date.now(), inicio: "08:00", fim: "12:00" },
    ]);
  };

  const removerHorario = (id: number) => {
    setHorarios((prev) => prev.filter((h) => h.id !== id));
  };

  const atualizarHorario = (id: number, campo: "inicio" | "fim", valor: string) => {
    setHorarios((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, [campo]: valor } : h
      )
    );
  };

  return (
    <div className="mt-8">
      <div className="mt-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">schedule</span>
          Disponibilidade Semanal
        </h3>

        <div className="flex flex-col gap-8">

          {/* DIAS */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Selecione os dias de estudo
            </p>

            <div className="flex flex-wrap gap-2">
              {diasSemana.map((dia) => (
                <label key={dia} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={diasSelecionados.includes(dia)}
                    onChange={() => toggleDia(dia)}
                    className="peer hidden"
                  />

                  <div className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                    peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white 
                    text-sm font-medium transition-all">
                    {dia}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* HORÁRIOS */}
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Horários disponíveis para os dias selecionados
              </p>
            </div>

            <div className="space-y-3">
              {horarios.map((h) => (
                <div key={h.id} className="flex flex-wrap sm:flex-nowrap items-center gap-3">

                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-8">Das</span>
                    <input
                      type="time"
                      value={h.inicio}
                      onChange={(e) =>
                        atualizarHorario(h.id, "inicio", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-8">Às</span>
                    <input
                      type="time"
                      value={h.fim}
                      onChange={(e) =>
                        atualizarHorario(h.id, "fim", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <button
                    onClick={() => removerHorario(h.id)}
                    className="p-2 text-slate-400 hover:text-red-500"
                  >
                    <span className="material-symbols-outlined text-xl">
                      delete
                    </span>
                  </button>

                </div>
              ))}
            </div>

            <button
              onClick={adicionarHorario}
              className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg 
              text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary transition-all 
              text-xs font-bold flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Adicionar Horário
            </button>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}