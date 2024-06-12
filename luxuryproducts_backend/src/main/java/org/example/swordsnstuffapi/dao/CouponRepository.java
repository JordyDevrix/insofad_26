package org.example.swordsnstuffapi.dao;

import org.example.swordsnstuffapi.models.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    public Coupon findCouponById(long id);

    public Optional findCouponByTitle(String title);
}
