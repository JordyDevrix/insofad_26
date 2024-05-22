package org.example.swordsnstuffapi.controller;

import org.example.swordsnstuffapi.dao.CategoryDAO;
import org.example.swordsnstuffapi.dto.CategoryDTO;
import org.example.swordsnstuffapi.models.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://s1149501.student.inf-hsleiden.nl:19501"})
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryDAO categoryDAO;

    public CategoryController(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategory(){
        return ResponseEntity.ok(this.categoryDAO.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<String> createCategory(@RequestBody CategoryDTO categoryDTO){
        this.categoryDAO.createCategory(categoryDTO);
        return ResponseEntity.ok("Created a new category named " + categoryDTO.name);
    }
}
