package org.example.swordsnstuffapi.controller;


import org.example.swordsnstuffapi.dao.CouponDAO;
import org.example.swordsnstuffapi.dto.CouponDTO;
import org.example.swordsnstuffapi.models.Coupon;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/coupons")
public class CouponController {

    private final CouponDAO couponDAO;

    public CouponController(CouponDAO couponDAO) {
        this.couponDAO = couponDAO;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getAllCoupons")
    public ResponseEntity<List<Coupon>> getAllCoupons(){
        return ResponseEntity.ok(this.couponDAO.getAllCoupons());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createCoupon")
    public ResponseEntity<Map<String, String>> createCoupon(@RequestBody CouponDTO couponDTO){
        this.couponDAO.createCoupon(couponDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "New coupon has been created.");
        return ResponseEntity.ok(response);
    }
}
