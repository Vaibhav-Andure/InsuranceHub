package com.InsureHub.CrudApplication.repository;



import com.InsureHub.CrudApplication.entities.PolicyHolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyHolderRepository extends JpaRepository<PolicyHolder, Integer> {
    // Additional custom queries can be added here if necessary
    PolicyHolder findByUser_UserId(int userId);

}
