package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.UserCreationDTO;
import com.synapse.sae501.models.User;

public class UserMapper {

    public User userCreationDTOToUser(UserCreationDTO userCreationDTO) {
        return new User(
                userCreationDTO.firstname(),
                userCreationDTO.lastname(),
                userCreationDTO.email(),
                userCreationDTO.password(),
                userCreationDTO.type(),
                userCreationDTO.phoneNumber(),
                userCreationDTO.imgName()
        );
    }

}
