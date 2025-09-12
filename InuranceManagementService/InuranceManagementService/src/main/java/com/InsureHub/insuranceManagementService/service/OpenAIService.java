package com.InsureHub.insuranceManagementService.service;


import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OpenAIService {

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    private final String apiKey =  System.getenv("OPENAI_API_KEY");

     // ✅ Must be set in your environment


    private final RestTemplate restTemplate = new RestTemplate();

    public String askLLM(String context, String question) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException("❌ OPENAI_API_KEY is missing. Please set it as a system environment variable.");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey); // ✅ Proper way to add Authorization: Bearer

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo"); // or "gpt-3.5-turbo"
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", "You are an insurance assistant. Use the provided context."));
        messages.add(Map.of("role", "user", "content", context + "\n\nQuestion: " + question));
        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                OPENAI_URL,
                HttpMethod.POST,
                request,
                Map.class
        );

        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
        if (choices != null && !choices.isEmpty()) {
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        }

        return "⚠️ No response from OpenAI.";
    }
}
