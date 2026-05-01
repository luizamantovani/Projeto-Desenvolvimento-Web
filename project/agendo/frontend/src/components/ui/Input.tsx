import React from 'react';
import type { InputProps } from '../../types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, erro, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">{label}</label>
        <div className="relative flex items-center">
          <input
            ref={ref}
            className={`w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 h-12 px-4 ${className}`}
            {...props}
          />
        </div>
        {erro && <span className="text-xs text-red-500">{erro}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
