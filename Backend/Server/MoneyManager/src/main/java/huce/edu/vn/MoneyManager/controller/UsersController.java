package huce.edu.vn.MoneyManager.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import huce.edu.vn.MoneyManager.entity.Users;
import huce.edu.vn.MoneyManager.service.LoginRequest;
import huce.edu.vn.MoneyManager.service.UsersService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    // Api trả về danh sách các User
    @GetMapping(path = "/all")
    public Collection<Users> list() {
        return usersService.getUsers();
    }

    // Api tìm kiếm User theo id
    @GetMapping("/{id}")
    public Users get(@PathVariable Long id) {
        Users u = usersService.getUsersByID(id);
        return u;
    }

    // Api kiểm tra tên username đã có chưa
    @GetMapping("/exists/{username}")
    public ResponseEntity<String> checkUserExistenceByUsername(@PathVariable String username) {
        boolean userExists = usersService.existsByUsername(username);

        if (userExists) {
            return new ResponseEntity<>(null, HttpStatus.valueOf(202));
        } else {
            return new ResponseEntity<>(null, HttpStatus.valueOf(203));
        }
    }

    // Api kiểm tra login và trả về id user
    @PostMapping("/check")
    public ResponseEntity<Object> checkUsernamePassword(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        Long userId = usersService.getUserIdByUsernameAndPassword(username, password);

        if (userId != null) {
            return ResponseEntity.ok().body(userId);
        } else {
            return new ResponseEntity<>(null, HttpStatus.valueOf(203));
        }

    }
    // Api Thêm User

    @PostMapping(path = "/add")
    public ResponseEntity<?> post(@RequestBody Users user) {
        usersService.createUsers(user);
        return new ResponseEntity<>(null, HttpStatus.valueOf(201));

    }

    // Api Sửa User
    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable Long id, @RequestBody Users input) {
        usersService.updateUsers(id, input);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // Api Xoá User
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean userExist = usersService.existsById(id);
        if (userExist) {
            usersService.deleteUsers(id);
            return new ResponseEntity<>(null, HttpStatus.valueOf(200));
        } else {
            return new ResponseEntity<>(null, HttpStatus.valueOf(400));
        }

    }

    // Api Xoá tất cả User
    @DeleteMapping(path = "/all")
    public ResponseEntity<?> deleteAll() {
        usersService.deleteUsersAll();
        return new ResponseEntity<>("Xoa tat ca user thanh cong", HttpStatus.valueOf(200));
    }

}
