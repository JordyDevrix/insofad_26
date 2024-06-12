package org.example.swordsnstuffapi.dao;

import jakarta.transaction.Transactional;
import org.example.swordsnstuffapi.dto.ProductDTO;
import org.example.swordsnstuffapi.models.Category;
import org.example.swordsnstuffapi.models.Product;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class ProductDAO {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    public ProductDAO(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts(){
        return this.productRepository.findAll();
    }

    public List<Product> getAllProductByCategory(long id){
        Optional<List<Product>> products = this.productRepository.findByCategoryId(id);

        if(products.get().isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "NO PRODUCTS WITH CATEGORY ID: " + id
            );
        }
        return products.get();
    }

    @Transactional
    public void createProduct(ProductDTO productDTO){
        Optional<Category> category = this.categoryRepository.findById(productDTO.categoryId);
        if(category.isPresent()){
            Product product = new Product(productDTO.thumbnail, productDTO.name, productDTO.description, productDTO.price, productDTO.amount, category.get());
            this.productRepository.save(product);
            return;
        }
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "CATEGORY ID NOT FOUND"
        );
    }

    @Transactional
    public void createProduct(Product product){
        this.categoryRepository.save(product.getCategory());
        this.productRepository.save(product);
    }

    public void updateProduct(ProductDTO productDTO, Long id){
        Optional<Product> product = this.productRepository.findById(id);
        if (product.isPresent()){
            product.get().setThumpnail(productDTO.thumbnail);
            product.get().setName(productDTO.name);
            product.get().setDescription(productDTO.description);
            product.get().setPrice(productDTO.price);
            product.get().setAmount(productDTO.amount);

            this.productRepository.save(product.get());
            return;
        }
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "CATEGORY ID NOT FOUND"
        );
    }

    public void deleteProductById(Long id) {
        this.productRepository.deleteById(id);
    }
}
