package com.InsureHub.insuranceManagementService.controller;




import com.InsureHub.insuranceManagementService.DTO.FeedbackResponseDTO;
import com.InsureHub.insuranceManagementService.entities.Feedback;
import com.InsureHub.insuranceManagementService.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/insurance/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // POST endpoint to submit feedback
    @PostMapping("/submit")
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        // Directly save feedback; frontend limits words/characters
        return feedbackService.submitFeedback(feedback);
    }

    // Get all feedbacks with username
    @GetMapping("/all")
    public List<FeedbackResponseDTO> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }
}
