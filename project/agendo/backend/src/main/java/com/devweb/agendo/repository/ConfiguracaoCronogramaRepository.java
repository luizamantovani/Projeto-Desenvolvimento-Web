package com.devweb.agendo.repository;

import com.devweb.agendo.model.ConfiguracaoCronograma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfiguracaoCronogramaRepository extends JpaRepository<ConfiguracaoCronograma, Long> {
    Optional<ConfiguracaoCronograma> findByUsuarioId(Long usuarioId);
}
