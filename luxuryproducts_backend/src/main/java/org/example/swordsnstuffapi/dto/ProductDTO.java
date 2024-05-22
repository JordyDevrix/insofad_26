package org.example.swordsnstuffapi.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import org.example.swordsnstuffapi.models.Category;

public class ProductDTO {
    public String thumbnail;
    public String name;
    public String description;
    public Number price;
    public Number amount;
    @JsonAlias("category_id")
    public long categoryId;

    public ProductDTO(String thumbnail, String name, String description, Number price, Number amount, long categoryId) {
        this.thumbnail = thumbnail;
        this.name = name;
        this.description = description;
        this.price = price;
        this.amount = amount;
        this.categoryId = categoryId;
    }
}
