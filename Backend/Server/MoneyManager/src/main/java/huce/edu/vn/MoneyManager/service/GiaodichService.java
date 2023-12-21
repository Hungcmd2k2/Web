package huce.edu.vn.MoneyManager.service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import huce.edu.vn.MoneyManager.entity.Giaodich;

public interface GiaodichService {
    public abstract Giaodich getGiaodichByID(Long magd);

    public abstract void createGiaodich(Giaodich giaodich);

    public abstract void updateGiaodich(Long magd, Giaodich giaodich);

    public abstract void deleteGiaodich(Long magd);

    public abstract void deleteGiaodichAll();

    public abstract boolean existsById(Long id);

    public abstract Collection<Giaodich> getGiaodichs();

    public List<Giaodich> getGiaodichByUserid(int userid);

    public List<Object[]> calculateTotalByTengd();

    public List<Object[]> calculateTotalByTengdAndUserId(Long userid);

    public List<Giaodich> getTongTienByNgaygdAndUseridAndNhomgd(LocalDate startDate, LocalDate endDate, Long userId, String nhomgd);

}