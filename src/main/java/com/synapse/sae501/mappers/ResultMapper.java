package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.ResultCreationDTO;
import com.synapse.sae501.models.Result;
import com.synapse.sae501.services.SessionService;
import com.synapse.sae501.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class ResultMapper {

    @Autowired UserService userService;
    @Autowired SessionService sessionService;

    public Result resultCreationDTOToResult(ResultCreationDTO resultCreationDTO){
        return new Result(
                resultCreationDTO.grade(),
                resultCreationDTO.description(),
                userService.getUserById(resultCreationDTO.user().id()),
                sessionService.getSessionById(resultCreationDTO.session().id())
        );
    }
}
