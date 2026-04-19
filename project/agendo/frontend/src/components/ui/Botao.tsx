import React from 'react';
import type { BotaoProps } from '../../types';

export const Botao: React.FC<BotaoProps> = ({ 
  children, 
  variante = 'primario', 
  icone, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'flex items-center justify-center gap-2 rounded-lg font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed';
  
  const variantes = {
    primario: 'bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20',
    secundario: 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm',
    fantasma: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
  };

  return (
    <button className={`${baseClasses} ${variantes[variante]} ${className}`} {...props}>
      {icone && icone}
      {children}
    </button>
  );
};
