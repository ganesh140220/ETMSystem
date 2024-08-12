package com.example.demo.controller;

import com.example.demo.entities.Query;
import com.example.demo.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/queries")
@CrossOrigin(origins  = "http://localhost:3000")
public class QueryController {

    private final QueryService queryService;

    @Autowired
    public QueryController(QueryService queryService) {
        this.queryService = queryService;
    }

    @PostMapping
    public ResponseEntity<Query> createQuery(@RequestBody Query query) {
        Query savedQuery = queryService.saveQuery(query);
        return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
    }

  

}
