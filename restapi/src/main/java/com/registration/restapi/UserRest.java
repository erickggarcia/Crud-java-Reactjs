package com.registration.restapi;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.registration.restapi.database.RepositoryUser;
import com.registration.restapi.entity.User;

@RestController
@RequestMapping("/user")
public class UserRest {

    @Autowired
    private RepositoryUser repository;

    @GetMapping
    public List<User> list() {
        return repository.findAll();
    }

    @PostMapping
    public User save(@RequestBody User user) {
        return repository.save(user);
    }

    @PutMapping
    public void update(@RequestBody User user) {
        if(user.getId() > 0) {
            repository.save(user);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        repository.deleteById(id);
    }
}
