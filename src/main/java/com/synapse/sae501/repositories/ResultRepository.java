package com.synapse.sae501.repositories;

import com.synapse.sae501.models.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long>, JpaSpecificationExecutor<Result> {
}
