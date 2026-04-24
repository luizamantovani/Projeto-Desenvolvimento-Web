package com.devweb.agendo.repository;

import com.devweb.agendo.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {
    List<Materia> findByUsuarioId(Long usuarioId);
}
