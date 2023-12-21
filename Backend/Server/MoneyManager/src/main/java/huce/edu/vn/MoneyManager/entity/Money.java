package huce.edu.vn.MoneyManager.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Money {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private BigDecimal sodu;

    public BigDecimal getSodu() {
        return sodu;
    }

    public void setSodu(BigDecimal sodu) {
        this.sodu = sodu;
    }

    private BigDecimal khoanthu;

    public BigDecimal getKhoanthu() {
        return khoanthu;
    }

    public void setKhoanthu(BigDecimal khoanthu) {
        this.khoanthu = khoanthu;
    }

    private BigDecimal khoanchi;

    public BigDecimal getKhoanchi() {
        return khoanchi;
    }

    public void setKhoanchi(BigDecimal khoanchi) {
        this.khoanchi = khoanchi;
    }

    private Long userid;

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

}
