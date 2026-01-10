package com.synapse.sae501.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreatePaymentIntentDTO(
        @Schema(
                description = "Amount in cents (e.g. 1000 = 10.00€)",
                example = "1000"
        )
        Integer amount
) {
}
