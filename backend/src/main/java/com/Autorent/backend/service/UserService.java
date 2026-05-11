package com.Autorent.backend.service;

import com.Autorent.backend.model.User;
import com.Autorent.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public User register(User user) {
        return repository.save(user);
    }

    public User login(String email, String password) {

        Optional<User> user = repository.findByEmail(email);

        if(user.isPresent()
                && user.get().getPassword().equals(password)) {

            return user.get();
        }

        return null;
    }

    public User update(Long id, User updatedUser) {

        User user = repository.findById(id).orElse(null);

        if(user != null) {

            user.setName(updatedUser.getName());

            user.setLastname(updatedUser.getLastname());

            user.setEmail(updatedUser.getEmail());

            user.setPassword(updatedUser.getPassword());

            user.setAdmin(updatedUser.getAdmin());

            return repository.save(user);
        }

        return null;
    }
}