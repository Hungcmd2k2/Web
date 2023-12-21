package huce.edu.vn.MoneyManager.controller;

import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import huce.edu.vn.MoneyManager.entity.Money;
import huce.edu.vn.MoneyManager.entity.MoneyRequest;
import huce.edu.vn.MoneyManager.service.MoneyService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/money")
public class MoneyController {
    @Autowired
    private MoneyService moneyService;

    // Api trả về danh sách các money
    @GetMapping(path = "/all")
    public Collection<Money> list() {
        return moneyService.getMoneys();
    }
    // Api Thêm Ví Money

    @PostMapping(path = "/add")
    public ResponseEntity<?> post(@RequestBody Money money) {
        moneyService.createMoney(money);
        return new ResponseEntity<>(null, HttpStatus.valueOf(201));

    }

    // Api Sửa money
    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable Long id, @RequestBody Money input) {
        moneyService.updateMoney(id, input);
        return new ResponseEntity<>("Sua money thanh cong", HttpStatus.valueOf(303));
    }

    // Api Xoá money
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean moneyExist = moneyService.existsById(id);
        if (moneyExist) {
            moneyService.deleteMoney(id);
            return new ResponseEntity<>("Xoa money thanh cong", HttpStatus.valueOf(200));
        } else {
            return new ResponseEntity<>("Money khong ton tai", HttpStatus.valueOf(400));
        }

    }

    // Api Xoá tất cả money
    @DeleteMapping(path = "/all")
    public ResponseEntity<?> deleteAll() {
        moneyService.deleteMoneyAll();
        return new ResponseEntity<>("Xoa tat ca money thanh cong", HttpStatus.valueOf(200));
    }

    // Api lấy danh sách giao dịch theo Userid
    @GetMapping("/{userid}")
    public List<Money> getMoneyByUserid(@PathVariable int userid) {
        return moneyService.getMoneyByUserid(userid);
    }

    // Cộng tiền
    @PostMapping("/congtien/{id}")
    public void congTien(@PathVariable Long id, @RequestBody MoneyRequest moneyRequest) {
        moneyService.congTien(id, moneyRequest.getAmount(), moneyRequest.getType());
    }
}
