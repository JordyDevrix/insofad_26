package org.example.swordsnstuffapi.dao;

import org.example.swordsnstuffapi.models.CustomUser;
import org.example.swordsnstuffapi.models.Order;
import org.example.swordsnstuffapi.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByCustomUser (CustomUser customUser);
}
