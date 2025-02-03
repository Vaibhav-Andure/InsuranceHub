package com.InsureHub.CrudApplication.repository;



import com.InsureHub.CrudApplication.entities.Transaction;
import com.InsureHub.CrudApplication.entities.PolicyHolder;
import com.InsureHub.CrudApplication.entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    Transaction findByTransactionId(String transactionId);



}
