package com.synapse.sae501.services;

import com.synapse.sae501.models.User;
import com.synapse.sae501.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Dictionary;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user){
        return this.userRepository.save(user);
    }

    public User getUserById(Long id){
        return this.userRepository.findById(id).get();
    }

    public Iterable<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public void deleteUserById(Long id){
        this.userRepository.deleteById(id);
    }

    public User updateUser(User user, Long id){
        user.setId(id);
        return this.userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(new User());
    }
}
