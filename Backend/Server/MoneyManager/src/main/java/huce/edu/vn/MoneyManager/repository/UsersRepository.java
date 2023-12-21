package huce.edu.vn.MoneyManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import huce.edu.vn.MoneyManager.entity.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    // Các phương thức truy vấn tùy chỉnh nếu cần
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM Users u WHERE u.username = :username")
    boolean existsByUsername(String username);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM Users u WHERE u.username = :username AND u.password = :password")
    boolean checkUserNameandPassword(String username, String password);

    Users findByUsernameAndPassword(String username, String password);
}