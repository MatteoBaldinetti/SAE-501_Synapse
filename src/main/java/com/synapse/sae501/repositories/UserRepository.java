package com.synapse.sae501.repositories;

import com.synapse.sae501.models.UserModel;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserModel, Long> {
}
