package com.Autorent.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {

    private Long id;

    private String name;

    private String lastname;

    private String email;

    private Boolean admin;

}