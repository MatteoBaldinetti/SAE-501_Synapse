package com.synapse.sae501.services;

import com.synapse.sae501.models.User;
import com.synapse.sae501.repositories.UserRepository;
import com.synapse.sae501.specifications.UserSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public void deleteUserById(Long id){
        this.userRepository.deleteById(id);
    }

    public User updateUser(User user, Long id){
        user.setId(id);
        return this.userRepository.save(user);
    }

    public List<User> searchUsers(
            Long id,
            String firstname,
            String lastname,
            String email,
            String password,
            Integer type,
            String phoneNumber,
            String imgName
    ) {
        List<Specification<User>> specs = new ArrayList<>();

        if (id != null) specs.add(UserSpecifications.hasId(id));
        if (firstname != null) specs.add(UserSpecifications.hasFirstname(firstname));
        if (lastname != null) specs.add(UserSpecifications.hasLastname(lastname));
        if (email != null) specs.add(UserSpecifications.hasEmail(email));
        if (password != null) specs.add(UserSpecifications.hasPassword(password));
        if (type != null) specs.add(UserSpecifications.hasType(type));
        if (phoneNumber != null) specs.add(UserSpecifications.hasPhoneNumber(phoneNumber));
        if (imgName != null) specs.add(UserSpecifications.hasImgName(imgName));

        Specification<User> finalSpec = specs.stream()
                .reduce(Specification::and)
                .orElse(null);


        return finalSpec == null ? userRepository.findAll() : userRepository.findAll(finalSpec);
    }
}
