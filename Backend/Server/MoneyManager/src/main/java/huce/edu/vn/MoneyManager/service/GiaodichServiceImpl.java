package huce.edu.vn.MoneyManager.service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import huce.edu.vn.MoneyManager.entity.Giaodich;

import huce.edu.vn.MoneyManager.repository.GiaodichRepository;

@Service
public class GiaodichServiceImpl implements GiaodichService {
    @Autowired
    GiaodichRepository giaodichRepo;

    @Override
    public Giaodich getGiaodichByID(Long magd) {
        return giaodichRepo.findById(magd).get();
    }

    @Override
    public void createGiaodich(Giaodich giaodich) {
        giaodichRepo.save(giaodich);
    }

    @Override
    public void updateGiaodich(Long magd, Giaodich giaodich) {
        giaodich.setMagd(magd);
        giaodichRepo.save(giaodich);
    }

    @Override
    public boolean existsById(Long magd) {
        return giaodichRepo.existsById(magd);
    }

    @Override
    public void deleteGiaodich(Long magd) {
        giaodichRepo.deleteById(magd);
    }

    @Override
    public void deleteGiaodichAll() {
        giaodichRepo.deleteAll();
    }

    @Override
    public Collection<Giaodich> getGiaodichs() {
        return giaodichRepo.findAll();
    }

    @Override
    public List<Giaodich> getGiaodichByUserid(int userid) {
        return giaodichRepo.findByUserid(userid);
    }

    @Override
    public List<Object[]> calculateTotalByTengd() {
        return giaodichRepo.calculateTotalByTengd();
    }

    @Override
    public List<Object[]> calculateTotalByTengdAndUserId(Long userid) {
        return giaodichRepo.calculateTotalByTengdAndUserId(userid);
    }

    @Override
    public List<Giaodich> getTongTienByNgaygdAndUseridAndNhomgd(LocalDate startDate, LocalDate endDate, Long userId, String nhomgd) {
        return giaodichRepo.findByNgaygdBetweenAndUseridAndNhomgd(startDate, endDate, userId, nhomgd);
    }

}
