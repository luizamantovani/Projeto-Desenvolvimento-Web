import { useState } from "react";

export default function Calendar({
  dataSelecionada,
  setDataSelecionada,
}: {
  dataSelecionada: string;
  setDataSelecionada: (data: string) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sincronizar o calendário com a data vinda do localStorage/prop no carregamento inicial
  useState(() => {
    if (dataSelecionada && dataSelecionada.includes('/')) {
      const [, m, y] = dataSelecionada.split('/').map(Number);
      setCurrentDate(new Date(y, m - 1, 1));
    }
  });

  const getSelectedDayInView = () => {
    if (!dataSelecionada) return null;
    const [d, m, y] = dataSelecionada.split('/').map(Number);
    if (y === currentDate.getFullYear() && m === currentDate.getMonth() + 1) {
      return d;
    }
    return null;
  };

  const selectedDay = getSelectedDayInView();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSelect = (day: number) => {
    const data = new Date(year, month, day);
    const formatted = data.toLocaleDateString("pt-BR");
    setDataSelecionada(formatted);
  };

  const changeMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const formatDate = () => {
    return dataSelecionada || "";
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">

      {/* HEADER (novo, mas simples e sem mudar estilo geral) */}
      <div className="flex justify-between items-center mb-2">
        <button aria-label="Mês anterior" onClick={() => changeMonth(-1)} className="cursor-pointer">
          ◀
        </button>

        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {currentDate.toLocaleDateString("pt-BR", {
            month: "short",
            year: "numeric",
          })}
        </p>

        <button aria-label="Próximo mês" onClick={() => changeMonth(1)} className="cursor-pointer">
          ▶
        </button>
      </div>

      {/* CALENDÁRIO */}
      <div className="grid grid-cols-7 text-center">

        {/* Dias da semana */}
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
          <p key={d} className="text-slate-400 text-xs font-bold uppercase py-2">
            {d}
          </p>
        ))}

        {/* Espaço antes do primeiro dia */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}

        {/* Dias */}
        {days.map((day) => {
          const isSelected = day === selectedDay;

          return (
            <div
              key={day}
              onClick={() => handleSelect(day)}
              className={`py-2 text-sm rounded-lg cursor-pointer transition-colors
                ${
                  isSelected
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-slate-900 dark:text-slate-100 hover:bg-primary/10"
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <label className="flex flex-col">
        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-1.5">
          Data Selecionada
        </p>

        <div className="relative">
          <input
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            readOnly
            value={formatDate()}
          />

          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            calendar_month
          </span>
        </div>
      </label>
    </div>
  );
}