package org.example.swordsnstuffapi.dao;
import org.example.swordsnstuffapi.dto.CouponDTO;
import org.example.swordsnstuffapi.dto.OrderDTO;
import org.example.swordsnstuffapi.models.Coupon;
import org.example.swordsnstuffapi.models.CustomUser;
import org.example.swordsnstuffapi.models.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CouponDAO {
    private final CouponRepository couponRepository;

    public CouponDAO(CouponRepository couponRepository) {this.couponRepository = couponRepository;}

    public List<Coupon> getAllCoupons() {return this.couponRepository.findAll();}

    public void createCoupon(CouponDTO couponDTO){
        Coupon coupon = new Coupon(
            couponDTO.id,
                couponDTO.title,
            couponDTO.message,
            couponDTO.amount,
            couponDTO.price,
            couponDTO.startDate,
            couponDTO.endDate,
            couponDTO.type,
            couponDTO.status
        );
        couponRepository.save(coupon);
    }}
