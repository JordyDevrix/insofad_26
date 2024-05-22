package org.example.swordsnstuffapi.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import org.example.swordsnstuffapi.models.Product;

import java.util.List;

public class OrderDTO {

    public List<Product> products;

    public double total_price;


    public OrderDTO(List<Product> products, double total_price) {
        this.products = products;
        this.total_price = total_price;
    }
}
