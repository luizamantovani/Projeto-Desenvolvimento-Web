import { type LoginProps } from '../types/auth/loginProps';
import { type RegistroProps } from '../types/auth/registroProps';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const loginUsuario = async (dados: LoginProps) => {
    const resposta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    if (!resposta.ok)
        throw new Error('Credenciais inválidas');
    return resposta.json();
};



export const registrarUsuario = async (dados: RegistroProps) => {
    const resposta = await fetch(`${API_URL}/auth/registrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
        const errorData = await resposta.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao registrar usuário. O e-mail pode já estar em uso.');
    }

    try {
        return await resposta.json();
    } catch (e) {
        console.error('Erro ao processar resposta:', e);
        return { success: true };
    }
};