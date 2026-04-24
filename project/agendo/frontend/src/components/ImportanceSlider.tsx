
type ImportanceSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function ImportanceSlider({ value, onChange }: ImportanceSliderProps) {

  const getColor = (val: number) => {
    if (val <= 3) return "bg-emerald-500";
    if (val <= 7) return "bg-orange-400";
    return "bg-red-500";
  };

  const getLabel = (val: number) => {
    if (val <= 3) return "Pouca Importância";
    if (val <= 7) return "Média Importância";
    return "Muita Importância";
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
      
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-slate-900 dark:accent-white"
      />

      <div className="text-center mt-2 text-lg font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2">
        {value}
        <span className={`w-3 h-3 rounded-full ${getColor(value)}`}></span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {getLabel(value)}
        </span>
      </div>

    </div>
  );
}