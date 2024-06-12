package org.example.swordsnstuffapi.dao;

import org.apache.catalina.User;
import org.example.swordsnstuffapi.dto.OrderDTO;
import org.example.swordsnstuffapi.models.CustomUser;
import org.example.swordsnstuffapi.models.Order;
import org.example.swordsnstuffapi.services.UserService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderDAO {

    private final OrderRepository orderRepository;
    private UserRepository userRepository;
    private UserService userService;

    public OrderDAO(OrderRepository orderRepository, UserRepository userRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.userService = userService;

    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByCustomUser (){
        CustomUser  customUser = userService.getActiveUser();
        return this.orderRepository.findAllByCustomUser(customUser);
    }


    public void createOrder(OrderDTO orderDTO){
        CustomUser customUser = userService.getActiveUser();
        Order newOrder = new Order(
                customUser,
                orderDTO.products,
                orderDTO.total_price
        );
        this.orderRepository.save(newOrder);
    }
}
