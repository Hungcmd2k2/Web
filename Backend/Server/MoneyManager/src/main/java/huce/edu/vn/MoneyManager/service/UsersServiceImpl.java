package huce.edu.vn.MoneyManager.service;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import huce.edu.vn.MoneyManager.entity.Users;
import huce.edu.vn.MoneyManager.repository.UsersRepository;

@Service
public class UsersServiceImpl implements UsersService {
    @Autowired
    UsersRepository usersRepo;

    @Override
    public Users getUsersByID(Long id) {
        return usersRepo.findById(id).get();
    }

    @Override
    public void createUsers(Users user) {
        usersRepo.save(user);
    }

    @Override
    public void updateUsers(Long id, Users user) {
        user.setId(id);
        usersRepo.save(user);
    }

    @Override
    public void deleteUsers(Long id) {
        usersRepo.deleteById(id);
    }

    @Override
    public void deleteUsersAll() {
        usersRepo.deleteAll();
    }

    @Override
    public Collection<Users> getUsers() {
        return usersRepo.findAll();
    }

    @Override
    public boolean existsById(Long id) {
        return usersRepo.existsById(id);
    }

    @Override
    public boolean existsByUsername(String username) {
        return usersRepo.existsByUsername(username);
    }

    @Override
    public boolean checkUserNameandPassword(String username, String password) {
        return usersRepo.checkUserNameandPassword(username, password);
    }

    @Override
    public Long getUserIdByUsernameAndPassword(String username, String password) {
        Users user = usersRepo.findByUsernameAndPassword(username, password);
        return (user != null) ? user.getId() : null;
    }
}