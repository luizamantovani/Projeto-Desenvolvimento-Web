package com.devweb.agendo.repository;

import com.devweb.agendo.model.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Long> {

    List<Sessao> findByUsuarioIdAndDataBetween(Long usuarioId, LocalDate inicio, LocalDate fim);

    // Deleta sessões futuras se o usuário quiser gerar um novo cronograma
    void deleteByUsuarioIdAndDataAfter(Long usuarioId, LocalDate data);

    List<Sessao> findByUsuarioIdAndDataAfterOrderByDataAscHoraInicioAsc(Long id, LocalDate localDate);
}
