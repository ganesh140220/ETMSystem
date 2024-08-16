package com.example.demo.service;



import com.example.demo.entities.Query;
import com.example.demo.entities.Solution;
import com.example.demo.repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QueryService {

    private final QueryRepository queryRepository;

    @Autowired
    public QueryService(QueryRepository queryRepository) {
        this.queryRepository = queryRepository;
    }

    // Method to save a Query object
    public Query saveQuery(Query query) {
        return queryRepository.save(query);
    }

    // Method to retrieve a Query object by its ID
    public Optional<Query> getQueryById(int id) {
        return queryRepository.findById(id);
    }

    
   
    // Add other necessary methods here if needed
}
