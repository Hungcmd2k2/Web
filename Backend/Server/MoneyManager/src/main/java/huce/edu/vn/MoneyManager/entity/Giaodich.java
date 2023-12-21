package huce.edu.vn.MoneyManager.entity;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Giaodich {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long magd;
    private String nhomgd;
    private String tengd;
    private LocalDate ngaygd;
    private Time thoigiangd;
    private BigDecimal sotiengd;
    private String ghichu;
    private Long userid;

    public Long getMagd() {
        return magd;
    }

    public void setMagd(Long magd) {
        this.magd = magd;
    }

    public String getNhomgd() {
        return nhomgd;
    }

    public void setNhomgd(String nhomgd) {
        this.nhomgd = nhomgd;
    }

    public String getTengd() {
        return tengd;
    }

    public void setTengd(String tengd) {
        this.tengd = tengd;
    }

    public LocalDate getNgaygd() {
        return ngaygd;
    }

    public void setNgaygd(LocalDate ngaygd) {
        this.ngaygd = ngaygd;
    }

    public Time getThoigiangd() {
        return thoigiangd;
    }

    public void setThoigiangd(Time thoigiangd) {
        this.thoigiangd = thoigiangd;
    }

    public BigDecimal getSotiengd() {
        return sotiengd;
    }

    public void setSotiengd(BigDecimal sotiengd) {
        this.sotiengd = sotiengd;
    }

    public String getGhichu() {
        return ghichu;
    }

    public void setGhichu(String ghichu) {
        this.ghichu = ghichu;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }
}
