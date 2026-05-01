package com.devweb.agendo.service;

import com.devweb.agendo.model.Sessao;
import com.devweb.agendo.model.enums.StatusTarefa;
import com.devweb.agendo.repository.SessaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SessaoService {

    private final SessaoRepository sessaoRepository;

    public SessaoService(SessaoRepository sessaoRepository) {
        this.sessaoRepository = sessaoRepository;
    }

    @Transactional
    public void alternarStatusConclusao(Long sessaoId, Long usuarioLogadoId) {
        Sessao sessao = sessaoRepository.findById(sessaoId)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));

        if (!sessao.getUsuario().getId().equals(usuarioLogadoId)) {
            throw new RuntimeException("Acesso negado: Esta sessão pertence a outro usuário.");
        }

        if (sessao.getStatus() == StatusTarefa.CONCLUIDA) {
            sessao.setStatus(StatusTarefa.PENDENTE);
        } else {
            sessao.setStatus(StatusTarefa.CONCLUIDA);
        }

        sessaoRepository.save(sessao);
    }
}