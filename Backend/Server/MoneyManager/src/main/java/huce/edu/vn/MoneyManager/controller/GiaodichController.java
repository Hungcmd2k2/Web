package huce.edu.vn.MoneyManager.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
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
import huce.edu.vn.MoneyManager.entity.Giaodich;
import huce.edu.vn.MoneyManager.entity.NgaygdUseridRequest;
import huce.edu.vn.MoneyManager.entity.SearchRequest;
import huce.edu.vn.MoneyManager.repository.GiaodichRepository;
import huce.edu.vn.MoneyManager.service.GiaodichService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/giaodich")
public class GiaodichController {
    @Autowired
    private GiaodichService giaodichService;
    @Autowired
    private GiaodichRepository giaodichRepository;

    // Api trả về danh sách các giao dịch
    @GetMapping(path = "/all")
    public Collection<Giaodich> list() {
        return giaodichService.getGiaodichs();
    }
    // Api Thêm Giao Dịch

    @PostMapping(path = "/add")
    public ResponseEntity<?> post(@RequestBody Giaodich giaodich) {
        giaodichService.createGiaodich(giaodich);
        return new ResponseEntity<>(null, HttpStatus.valueOf(201));
    }

    // Api Sửa Giao dịch
    @PutMapping("/{magd}")
    public ResponseEntity<?> put(@PathVariable Long magd, @RequestBody Giaodich input) {
        giaodichService.updateGiaodich(magd, input);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // Api Xoá Giao dịch
    @DeleteMapping("/{magd}")
    public ResponseEntity<?> delete(@PathVariable Long magd) {
        boolean giaodichExist = giaodichService.existsById(magd);
        if (giaodichExist) {
            giaodichService.deleteGiaodich(magd);
            return new ResponseEntity<>(null, HttpStatus.valueOf(200));
        } else {
            return new ResponseEntity<>(null, HttpStatus.valueOf(400));
        }

    }

    // Api Xoá tất cả giao dịch
    @DeleteMapping(path = "/all")
    public ResponseEntity<?> deleteAll() {
        giaodichService.deleteGiaodichAll();
        return new ResponseEntity<>("Xoa tat ca giao dịch thanh cong", HttpStatus.valueOf(200));
    }

    // Api lấy danh sách giao dịch theo Userid
    @GetMapping("/{userid}")
    public List<Giaodich> getGiaodichByUserid(@PathVariable int userid) {
        return giaodichService.getGiaodichByUserid(userid);
    }

    // Api thống kê theo tên giao dịch
    @GetMapping("/calculateTotalByTengd")
    public List<Object[]> calculateTotalByTengd() {
        return giaodichService.calculateTotalByTengd();
    }

    // Api thong ke các tên giao dịch theo userid
    @GetMapping("/calculateTotalByTengdAndUserId/{userid}")
    public List<Object[]> calculateTotalByTengdAndUserId(@PathVariable Long userid) {
        return giaodichService.calculateTotalByTengdAndUserId(userid);
    }

    // Tìm kiếm giao dịch theo time
    @PostMapping("/search")
    public List<Giaodich> searchGiaodich(@RequestBody SearchRequest searchRequest) {
        return giaodichRepository.findByNgaygdBetweenAndUserid(
                searchRequest.getStartDate(),
                searchRequest.getEndDate(),
                searchRequest.getUserId());
    }

    // Thống kê giao dịch theo tháng
    @PostMapping("/tongtien/thang")
    public BigDecimal getTongTienByNgaygdAndUseridAndNhomgd(@RequestBody NgaygdUseridRequest request) {
        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();
        Long userId = request.getUserId();
        String nhomgd = request.getNhomgd();

        List<Giaodich> giaodichList = giaodichService.getTongTienByNgaygdAndUseridAndNhomgd(startDate, endDate, userId,
                nhomgd);

        // Tính tổng tiền
        BigDecimal tongTien = giaodichList.stream()
                .map(Giaodich::getSotiengd)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return tongTien;
    }
}
