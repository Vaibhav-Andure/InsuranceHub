package com.InsureHub.CrudApplication.repository;



import com.InsureHub.CrudApplication.entities.PolicyHolder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyHolderRepository extends JpaRepository<PolicyHolder, Integer> {
    // Additional custom queries can be added here if necessary

}
