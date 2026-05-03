const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface TurnoConfig {
  inicio: string;
  fim: string;
}

export interface MateriaConfig {
  nome: string;
  dificuldade: number;
  importancia: number;
}

export interface ConfiguracaoCronograma {
  dataLimite: string;
  diasSemanaDisponiveis: number[];
  turnos: TurnoConfig[];
  materias: MateriaConfig[];
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('@Agendo:token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const salvarConfiguracao = async (config: ConfiguracaoCronograma): Promise<void> => {
  const resposta = await fetch(`${API_URL}/cronogramas/configuracao`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(config)
  });

  if (!resposta.ok) {
    throw new Error('Erro ao salvar a configuração do cronograma.');
  }
};

export const buscarConfiguracao = async (): Promise<ConfiguracaoCronograma | null> => {
  const resposta = await fetch(`${API_URL}/cronogramas/configuracao`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (resposta.status === 204) return null;

  if (!resposta.ok) {
    throw new Error('Erro ao buscar a configuração do cronograma.');
  }

  return resposta.json();
};
