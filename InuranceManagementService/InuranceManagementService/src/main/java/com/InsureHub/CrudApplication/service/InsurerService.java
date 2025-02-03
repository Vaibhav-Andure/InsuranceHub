package com.InsureHub.CrudApplication.service;

import com.InsureHub.CrudApplication.DTO.InsurerDTO;
import com.InsureHub.CrudApplication.entities.Insurer;
import com.InsureHub.CrudApplication.entities.Policy;
import com.InsureHub.CrudApplication.entities.User;
import com.InsureHub.CrudApplication.repository.InsurerRepository;
import com.InsureHub.CrudApplication.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InsurerService {
    private static final Logger logger = LoggerFactory.getLogger(PolicyHolderService.class);

    @Autowired
    private InsurerRepository insurerRepository;
    @Autowired
    private UserRepository userRepository;
    // ✅ Create a new insurer
    public InsurerDTO createInsurer(Insurer insurer) {




        int userId = insurer.getUser().getUserId();

        // Log to track if the user exists or not
        logger.info("Fetching user with ID: {}", userId);





        if (insurer.getInsurerName() == null || insurer.getLicenseNumber() == null) {
            throw new IllegalArgumentException("Insurer name and license number are required.");

        }



        // Fetch the user using userId and set it, using orElseThrow for better error handling
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        insurer.setUser(user);  // Set the fetched u

        Insurer savedInsurer = insurerRepository.save(insurer);
        return convertToDTO(savedInsurer);
    }







    // ✅ Update an existing insurer
    public InsurerDTO updateInsurer(int id, Insurer updatedInsurer) {
        Optional<Insurer> existingInsurerOpt = insurerRepository.findById(id);
        if (existingInsurerOpt.isEmpty()) {
            throw new IllegalArgumentException("Insurer not found with ID: " + id);
        }

        Insurer existingInsurer = existingInsurerOpt.get();
        existingInsurer.setInsurerName(updatedInsurer.getInsurerName());
        existingInsurer.setLicenseNumber(updatedInsurer.getLicenseNumber());

        Insurer savedInsurer = insurerRepository.save(existingInsurer);
        return convertToDTO(savedInsurer);
    }

    // ✅ Get insurer by ID
    public Optional<InsurerDTO> getInsurerById(int id) {
        Optional<Insurer> insurer = insurerRepository.findById(id);
        return insurer.map(this::convertToDTO);
    }

    // ✅ Get all insurers
    public List<InsurerDTO> getAllInsurers() {
        List<Insurer> insurers = insurerRepository.findAll();
        return insurers.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Delete insurer by ID
    public boolean deleteInsurer(int id) {
        if (!insurerRepository.existsById(id)) {
            return false;  // Insurer not found
        }
        insurerRepository.deleteById(id);
        return true;  // Deleted successfully
    }

    private InsurerDTO convertToDTO(Insurer insurer) {
        List<Policy> policies = insurer.getPolicies();  // Directly get the list of Policy entities

        return new InsurerDTO(
                insurer.getInsurerId(),
                insurer.getInsurerName(),
                insurer.getLicenseNumber(),
                policies  // Pass the list of Policy entities to the DTO constructor
        );
    }


}
