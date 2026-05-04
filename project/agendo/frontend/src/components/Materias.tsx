import DifficultySlider from "./DifficultySlider";
import ImportanceSlider from "./ImportanceSlider";

export default function Materias({ materias, setMaterias }: { materias: any[]; setMaterias: any }) {

  const adicionarMateria = () => {
    setMaterias((prev: any) => [
      ...prev,
      { id: Date.now(), nome: "", dificuldade: 5, importancia: 5, hex: "#3B82F6" }
    ]);
  };

  const atualizarMateria = (id: any, campo: any, valor: any) => {
    setMaterias((prev: any[]) =>
      prev.map(m =>
        m.id === id ? { ...m, [campo]: valor } : m
      )
    );
  };

  const removerMateria = (id: any) => {
    setMaterias((prev: any[]) => prev.filter(m => m.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">

        <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">list_alt</span>
          Matérias para Estudar
        </h3>

        <div className="space-y-6">

          {/* LISTA DINÂMICA */}
          {materias.map((mat) => (
            <div
              key={mat.id}
              className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative shrink-0 cursor-pointer group/color">
                    <input
                      type="color"
                      value={mat.hex || "#3B82F6"}
                      onChange={(e) =>
                        atualizarMateria(mat.id, "hex", e.target.value)
                      }
                      className="w-9 h-9 rounded-lg border-0 cursor-pointer p-0.5 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0"
                      title="Cor da matéria"
                    />
                    <span className="material-symbols-outlined absolute -bottom-0.5 -right-0.5 text-[12px] bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-sm pointer-events-none text-slate-500 group-hover/color:text-primary transition-colors">
                      edit
                    </span>
                  </div>
                  <input
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Nome da Matéria"
                    type="text"
                    value={mat.nome}
                    onChange={(e) =>
                      atualizarMateria(mat.id, "nome", e.target.value)
                    }
                  />
                  <button 
                    onClick={() => removerMateria(mat.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                    title="Remover matéria"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    Nível de Dificuldade
                  </p>
                  <DifficultySlider
                    value={mat.dificuldade}
                    onChange={(valor: number) =>
                      atualizarMateria(mat.id, "dificuldade", valor)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    Nível de Importância
                  </p>
                  <ImportanceSlider
                    value={mat.importancia}
                    onChange={(valor: number) =>
                      atualizarMateria(mat.id, "importancia", valor)
                    }
                  />
                </div>

              </div>
            </div>
          ))}

          {/* BOTÃO */}
          <button
            onClick={adicionarMateria}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-all font-medium text-sm"
          >
            <span className="material-symbols-outlined">add</span>
            Adicionar Outra Matéria
          </button>

        </div>
      </div>
    </div>
  );
}