package huce.edu.vn.MoneyManager.service;

import java.util.Collection;
import huce.edu.vn.MoneyManager.entity.Users;

public interface UsersService {
    public abstract Users getUsersByID(Long id);

    public abstract void createUsers(Users user);

    public abstract void updateUsers(Long id, Users user);

    public abstract void deleteUsers(Long id);

    public abstract void deleteUsersAll();

    public abstract Collection<Users> getUsers();

    public abstract boolean existsById(Long id);

    public abstract boolean existsByUsername(String username);

    public abstract boolean checkUserNameandPassword(String username, String password);

    public abstract Long getUserIdByUsernameAndPassword(String username, String password);
}
