package com.synapse.sae501.repositories;

import com.synapse.sae501.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
