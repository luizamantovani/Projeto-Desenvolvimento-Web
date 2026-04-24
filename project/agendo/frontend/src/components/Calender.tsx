import { useState } from "react";

export default function Calendar({ setDataSelecionada }: { setDataSelecionada: (data: string) => void }) {

  const handleSelect = (day: any) => {
    const data = `${day} de Out, 2024`;
    setDataSelecionada(data);
  };
  const [selectedDay, setSelectedDay] = useState(16);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const formatDate = (day: number) => {
    return `${day} de Out, 2024`;
  };



  return (
    <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">

      {/* CALENDÁRIO */}
      <div className="grid grid-cols-7 text-center">

        {/* Dias da semana */}
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
          <p key={d} className="text-slate-400 text-xs font-bold uppercase py-2">
            {d}
          </p>
        ))}

        {/* Dias do mês */}
        {days.map((day) => {
          const isSelected = day === selectedDay;

          return (
            <div
              key={day}
              onClick={() => {
                setSelectedDay(day);
                handleSelect(day);
              }}
              className={`py-2 text-sm rounded-lg cursor-pointer transition-colors
                ${isSelected
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
            value={formatDate(selectedDay)}
          />

          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            calendar_month
          </span>
        </div>
      </label>
    </div>
  );
}