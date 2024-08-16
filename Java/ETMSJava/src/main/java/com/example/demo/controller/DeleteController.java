package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.DeleteService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DeleteController {

	  @Autowired
	    private DeleteService deleteService;



	  @DeleteMapping("/removeEmployee/{id}")
	    public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
	        try {
	        	deleteService.deleteEmployee(id);
	            return ResponseEntity.noContent().build(); // No content, but the deletion was successful
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 if something goes wrong
	        }
	    }
}
