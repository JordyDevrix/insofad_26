package org.example.swordsnstuffapi.services;

import org.example.swordsnstuffapi.dao.UserRepository;
import org.example.swordsnstuffapi.models.CustomUser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        CustomUser customUser = userRepository.findByEmail(email);
//        return new User(email,
//                customUser.getPassword(),
//                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
//    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CustomUser customUser = userRepository.findByEmail(email);
        if (customUser == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Determine roles
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if ("admin@admin.com".equalsIgnoreCase(email)) {
            authorities.add(new SimpleGrantedAuthority("ADMIN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("USER"));
        }

        return new User(customUser.getEmail(), customUser.getPassword(), authorities);
    }


    public CustomUser getActiveUser() {
        try {
            UsernamePasswordAuthenticationToken token =
                    (UsernamePasswordAuthenticationToken) SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            return userRepository.findByEmail(token.getName());
        } catch (ClassCastException e) {
            return null;
        }
    }
}
