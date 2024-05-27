package org.example.swordsnstuffapi.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.Date;

public class CouponDTO {
    public long id;
    public String title;
    public String message;
    public int amount;
    public int price;
    @JsonAlias("start_date")
    public Date startDate;
    @JsonAlias("end_date")
    public Date endDate;
    public String type;
    public boolean status;

    public CouponDTO(String title, String message, int amount, int price, Date startDate, Date endDate, String type, boolean status) {
        this.title = title;
        this.message = message;
        this.amount = amount;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
        this.status = status;
    }
}
