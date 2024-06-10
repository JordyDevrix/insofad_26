package org.example.swordsnstuffapi.controller;


import org.example.swordsnstuffapi.dao.CouponDAO;
import org.example.swordsnstuffapi.dto.CouponDTO;
import org.example.swordsnstuffapi.models.Coupon;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        return ResponseEntity.ok(this.couponDAO.getAllCoupons());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/createCoupon")
    public ResponseEntity<Map<String, String>> createCoupon(@RequestBody CouponDTO couponDTO) {
        this.couponDAO.createCoupon(couponDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "New coupon has been created.");
        return ResponseEntity.ok(response);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/applyCoupon")
    public ResponseEntity<?> applyCoupon(@RequestBody ApplyCouponRequest applyCouponRequest) {
        try {
            Optional<Coupon> coupon = couponDAO.findCouponByTitle(applyCouponRequest.title);
            if (coupon.isPresent() && coupon.get().isStatus()) {
                double discount = coupon.get().getPrice();
                double newTotal = applyCouponRequest.totalPrice - discount;

                return ResponseEntity.ok(new ApplyCouponResponse(newTotal, "Coupon applied successfully"));
            } else {
                return ResponseEntity.badRequest().body("Invalid or inactive coupon");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
            }
    }

    class ApplyCouponRequest {
        private String title;
        private double totalPrice;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public double getTotalPrice() {
            return totalPrice;
        }

        public void setTotalPrice(double totalPrice) {
            this.totalPrice = totalPrice;
        }
    }

    class ApplyCouponResponse {
        private double newTotal;
        private String message;

        public ApplyCouponResponse(double newTotal, String message) {
            this.newTotal = newTotal;
            this.message = message;
        }

        public double getNewTotal() {
            return newTotal;
        }

        public void setNewTotal(double newTotal) {
            this.newTotal = newTotal;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
