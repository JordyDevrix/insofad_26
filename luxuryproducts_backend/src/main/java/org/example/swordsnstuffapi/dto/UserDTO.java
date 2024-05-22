package org.example.swordsnstuffapi.dto;

import org.example.swordsnstuffapi.models.CustomUser;
import com.fasterxml.jackson.annotation.JsonAlias;

public class UserDTO {

    @JsonAlias("email")
    public String email;

    public UserDTO(String email){
        this.email = email;
    }

    public UserDTO(){

    }
}

