package com.synapse.sae501.mappers;

import com.synapse.sae501.dto.ResultCreationDTO;
import com.synapse.sae501.models.Result;
import com.synapse.sae501.services.SessionService;
import com.synapse.sae501.services.UserService;
import org.springframework.stereotype.Component;

@Component
public class ResultMapper {

    private final UserService userService;
    private final SessionService sessionService;

    public ResultMapper(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    public Result resultCreationDTOToResult(ResultCreationDTO resultCreationDTO){
        return new Result(
                resultCreationDTO.grade(),
                resultCreationDTO.description(),
                userService.getUserById(resultCreationDTO.user().id()),
                sessionService.getSessionById(resultCreationDTO.session().id())
        );
    }
}
