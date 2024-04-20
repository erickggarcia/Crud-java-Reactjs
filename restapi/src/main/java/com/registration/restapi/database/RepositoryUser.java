package com.registration.restapi.database;
import com.registration.restapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryUser extends JpaRepository<User, Long> {

}
