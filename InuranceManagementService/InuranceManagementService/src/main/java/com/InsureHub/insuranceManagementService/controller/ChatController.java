package com.InsureHub.insuranceManagementService.controller;



import com.InsureHub.insuranceManagementService.repository.FeedbackRepository;
import com.InsureHub.insuranceManagementService.repository.PolicyRepository;
import com.InsureHub.insuranceManagementService.service.OpenAIService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/insurance/chat")
public class ChatController {

    private final OpenAIService openAIService;
    private final PolicyRepository policyRepository;
    private final FeedbackRepository feedbackRepository;

    public ChatController(OpenAIService openAIService, PolicyRepository policyRepository, FeedbackRepository feedbackRepository) {
        this.openAIService = openAIService;
        this.policyRepository = policyRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");

        // 1. Collect context from MySQL (policies)
        String policies = policyRepository.findAll().stream()
                .map(p -> String.format(
                        "Policy Name: %s | Premium: %s | Coverage: %s | Benefits: %s",
                        p.getPolicyName(),
                        p.getPremiumAmount(),
                        p.getCoverageAmount(),
                        p.getBenefits()
                ))
                .collect(Collectors.joining("\n"));

        // 2. Collect context from MongoDB (feedback)
        String feedbacks = feedbackRepository.findAll().stream()
                .map(f -> String.format(
                        "User %d (%s) rated %d stars: %s",
                        f.getUserId(),
                        f.getTransactionId(),
                        f.getRating(),
                        f.getComments()
                ))
                .collect(Collectors.joining("\n"));

        // 3. Combine into context
        String context = "Policies:\n" + policies + "\n\nFeedbacks:\n" + feedbacks;

        // 4. Ask OpenAI with combined context + question
        return openAIService.askLLM(context, question);
    }

}

