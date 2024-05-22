package org.example.swordsnstuffapi.controller;

import org.example.swordsnstuffapi.dao.ProductDAO;
import org.example.swordsnstuffapi.dto.ProductDTO;
import org.example.swordsnstuffapi.models.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://s1149501.student.inf-hsleiden.nl:19501"})
@RequestMapping("/products")
public class ProductController {
    private final ProductDAO productDAO;

    public ProductController(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(this.productDAO.getAllProducts());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Product>> getAllProductsById(@PathVariable Long id){
        return ResponseEntity.ok(this.productDAO.getAllProductByCategory(id));
    }

    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody ProductDTO productDTO){
        this.productDAO.createProduct(productDTO);

        return ResponseEntity.ok("Created product: " + productDTO.name);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO){
        this.productDAO.updateProduct(productDTO, id);

        return ResponseEntity.ok("Updated product with id: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable Long id){
        this.productDAO.deleteProductById(id);

        return ResponseEntity.ok("Deleted product with id: " + id);
    }
}
