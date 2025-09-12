package com.InsureHub.insuranceManagementService.service;

import com.InsureHub.insuranceManagementService.DTO.FeedbackResponseDTO;
import com.InsureHub.insuranceManagementService.DTO.UserDTO;
import com.InsureHub.insuranceManagementService.entities.Feedback;
import com.InsureHub.insuranceManagementService.entities.User;
import com.InsureHub.insuranceManagementService.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserService userService;

    // Save feedback directly, no truncation
    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Get all feedbacks with username
    public List<FeedbackResponseDTO> getAllFeedbacks() {
        List<Feedback> feedbackList = feedbackRepository.findAll();

        return feedbackList.stream().map(feedback -> {
            Optional<UserDTO> userOpt = userService.getUserById(feedback.getUserId());
            String username = userOpt.map(UserDTO::getUsername)
                    .orElse("Unknown User");

            return new FeedbackResponseDTO(
                    feedback.getId(),
                    feedback.getUserId(),
                    username,
                    feedback.getRating(),
                    feedback.getComments()
            );
        }).collect(Collectors.toList());
    }

}
