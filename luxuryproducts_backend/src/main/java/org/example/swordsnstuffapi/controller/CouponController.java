package org.example.swordsnstuffapi.controller;


import org.example.swordsnstuffapi.dao.CouponDAO;
import org.example.swordsnstuffapi.dto.CouponDTO;
import org.example.swordsnstuffapi.models.Coupon;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/coupons")
public class CouponController {

    private final CouponDAO couponDAO;


    public CouponController(CouponDAO couponDAO) {
        this.couponDAO = couponDAO;
    }

    @GetMapping
    public ResponseEntity<List<Coupon>> getAllCoupons(){
        return ResponseEntity.ok(this.couponDAO.getAllCoupons());
    }

    @PostMapping
    public ResponseEntity<String> createCoupon(@RequestBody CouponDTO couponDTO){
        this.couponDAO.createCoupon(couponDTO);
     return ResponseEntity.ok("New coupon has been created");
    }
}
