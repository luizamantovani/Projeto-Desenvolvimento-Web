export interface MateriaProps {
  nome: string;
  progresso: number;
  dificuldade?: "Fácil" | "Médio" | "Difícil";
}

export interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "fantasma";
  icone?: React.ReactNode;
}

export interface CardMateriaProps {
  titulo: string;
  progresso: number;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  erro?: string;
}

export interface IconeProps {
  nome: string;
  className?: string;
}
