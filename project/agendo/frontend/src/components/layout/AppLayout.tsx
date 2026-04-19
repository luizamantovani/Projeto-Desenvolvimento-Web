import React from 'react';
import { Cabecalho } from './Cabecalho';
import { Rodape } from './Rodape';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <div className="flex h-full grow flex-col">
        <Cabecalho />
        <main className="mx-auto w-full max-w-[1200px] flex-1 p-4 md:p-10">
          {children}
        </main>
        <Rodape />
      </div>
    </div>
  );
};
