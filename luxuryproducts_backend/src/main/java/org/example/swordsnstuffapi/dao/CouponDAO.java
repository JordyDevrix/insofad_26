package org.example.swordsnstuffapi.dao;
import org.example.swordsnstuffapi.controller.CouponController;
import org.example.swordsnstuffapi.dto.CouponDTO;
import org.example.swordsnstuffapi.dto.OrderDTO;
import org.example.swordsnstuffapi.models.Coupon;
import org.example.swordsnstuffapi.models.CustomUser;
import org.example.swordsnstuffapi.models.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CouponDAO {
    private final CouponRepository couponRepository;

    public CouponDAO(CouponRepository couponRepository) {this.couponRepository = couponRepository;}

    public void createCoupon(CouponDTO couponDTO){
        Coupon coupon = new Coupon();
        coupon.setTitle(couponDTO.getTitle());
        coupon.setMessage(couponDTO.getMessage());
        coupon.setAmount(couponDTO.getAmount());
        coupon.setPrice(couponDTO.getPrice());
        coupon.setStartDate(couponDTO.getStartDate());
        coupon.setEndDate(couponDTO.getEndDate());
        coupon.setType(couponDTO.getType());
        coupon.setStatus(couponDTO.isStatus());
        couponRepository.save(coupon);
    }

    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Optional<Coupon> findCouponByTitle(String title) {
        return couponRepository.findCouponByTitle(title);
    }

}

