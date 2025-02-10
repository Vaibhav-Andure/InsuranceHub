package com.InsureHub.insuranceManagementService.service;

import com.InsureHub.insuranceManagementService.DTO.InsurerDTO;
import com.InsureHub.insuranceManagementService.entities.Insurer;
import com.InsureHub.insuranceManagementService.entities.Policy;
import com.InsureHub.insuranceManagementService.entities.User;
import com.InsureHub.insuranceManagementService.repository.InsurerRepository;
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
    private UserService userService;


    // ✅ Create a new insurer
    public InsurerDTO createInsurer(Insurer insurer) {

        User insureruser = userService.registerUser(insurer.getUser());


logger.info("saved user with insuree is " ,  insureruser);


          insurer.setUser(insureruser);

        Insurer savedInsurer = insurerRepository.save(insurer);
        return convertToDTO(savedInsurer);
    }

   

    public Insurer getInsurerByUserId(int userId) {
        return insurerRepository.findByUser_UserId(userId);
    }



    // ✅ Get insurer by user ID
    public Optional<InsurerDTO> getInsurerByUser_Id(int userId) {
        Insurer insurer = insurerRepository.findByUser_UserId(userId); // Ensure this method exists in the repository
        return Optional.ofNullable(insurer).map(this::convertToDTO);
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
