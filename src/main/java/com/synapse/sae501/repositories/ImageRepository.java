package com.synapse.sae501.repositories;

import com.synapse.sae501.models.Image;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ImageRepository extends CrudRepository<Image, Long> {
    Optional<Image> findByFileName(String fileName);
}
