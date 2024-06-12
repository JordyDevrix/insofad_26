package org.example.swordsnstuffapi.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private long id;
    private String thumpnail;
    private String name;
    private String description;
    private Number price;
    private Number amount;

    @ManyToOne(cascade = CascadeType.MERGE)
    private Category category;


    public Product(){}

    public Product(String thumpnail, String name, String description, Number price, Number amount, Category category) {
        this.thumpnail = thumpnail;
        this.name = name;
        this.description = description;
        this.price = price;
        this.amount = amount;
        this.category = category;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getThumpnail() {
        return thumpnail;
    }

    public void setThumpnail(String thumpnail) {
        this.thumpnail = thumpnail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Number getPrice() {
        return price;
    }

    public void setPrice(Number price) {
        this.price = price;
    }

    public Number getAmount() {
        return amount;
    }

    public void setAmount(Number amount) {
        this.amount = amount;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
