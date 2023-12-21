package huce.edu.vn.MoneyManager.entity;

import java.time.LocalDate;

public class NgaygdUseridRequest {
    private LocalDate startDate;
    public LocalDate getStartDate() {
        return startDate;
    }
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    private LocalDate endDate;
    public LocalDate getEndDate() {
        return endDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    private Long userId;
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    private String nhomgd;
    public String getNhomgd() {
        return nhomgd;
    }
    public void setNhomgd(String nhomgd) {
        this.nhomgd = nhomgd;
    }
}
