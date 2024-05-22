package org.example.swordsnstuffapi.controller;

import org.example.swordsnstuffapi.dao.OrderDAO;
import org.example.swordsnstuffapi.dto.OrderDTO;
import org.example.swordsnstuffapi.models.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://s1149501.student.inf-hsleiden.nl:19501"})
@RequestMapping("/orders")
public class OrderController {

    private final OrderDAO orderDAO;

    public OrderController(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrdersByCustomUser(){
        return ResponseEntity.ok(this.orderDAO.getOrdersByCustomUser());
    }

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrderDTO orderDTO){
        this.orderDAO.createOrder(orderDTO);
        return ResponseEntity.ok("new order has been created");
    }

}
