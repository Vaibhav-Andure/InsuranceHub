


package com.InsureHub.insuranceManagementService.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OpenAIService {

    // Hugging Face chat model endpoint
    private static final String HF_API_URL = "https://router.huggingface.co/v1/models/moonshotai/Kimi-K2-Instruct-0905";
    private final String hfToken = "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"; // Use env variable in production

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Ask a question to the Hugging Face chat model with additional context.
     *
     * @param context  The context (policies, feedbacks, etc.)
     * @param question The user's question
     * @return Model's response
     */
    public String askLLM(String context, String question) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (!hfToken.isBlank()) {
            headers.setBearerAuth(hfToken);
        }

        // Build messages array with system context + user question
        List<Map<String, Object>> messages = new ArrayList<>();

        // Optional: system role can contain instructions or context
        Map<String, Object> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are an insurance assistant. Use the context provided to answer the question.");
        messages.add(systemMessage);

        // User message combines context + question
        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", "Context:\n" + context + "\n\nQuestion:\n" + question);
        messages.add(userMessage);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "moonshotai/Kimi-K2-Instruct-0905");
        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    HF_API_URL,
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            // Parse the first choice's message content
            if (response.getBody() != null && response.getBody().containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> firstChoice = (Map<String, Object>) choices.get(0).get("message");
                    return firstChoice.get("content").toString();
                }
            }

            return "⚠️ No response from Hugging Face.";
        } catch (Exception e) {
            return "⚠️ Error: " + e.getMessage();
        }
    }
}
