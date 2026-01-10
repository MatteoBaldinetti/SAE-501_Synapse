package com.synapse.sae501.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.synapse.sae501.dto.CreatePaymentIntentDTO;
import com.synapse.sae501.dto.PaymentIntentSecretDTO;
import com.synapse.sae501.exceptions.ApiError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
@Tag(name = "Payments", description = "Endpoints for managing payments")
public class PaymentController {

    @Operation(
            summary = "Create a Stripe payment intent",
            description = "Creates a Stripe PaymentIntent and returns the client secret needed by the frontend to complete the payment."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Payment intent successfully created",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    description = "Client secret returned by Stripe",
                                    example = "{ \"clientSecret\": \"pi_3Nabc123_secret_XYZ\" }"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid payment request",
                    content = @Content(schema = @Schema(implementation = ApiError.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Stripe error while creating payment intent",
                    content = @Content(schema = @Schema(implementation = ApiError.class))
            )
    })
    @PostMapping("/create-intent")
    public PaymentIntentSecretDTO createPaymentIntent(
            @RequestBody CreatePaymentIntentDTO request
    ) throws StripeException {

        Integer amount = request.amount();

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amount.longValue())
                        .setCurrency("eur")
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods
                                        .builder()
                                        .setEnabled(true)
                                        .build()
                        )
                        .build();

        PaymentIntent intent = PaymentIntent.create(params);

        return new PaymentIntentSecretDTO(intent.getClientSecret());
    }
}