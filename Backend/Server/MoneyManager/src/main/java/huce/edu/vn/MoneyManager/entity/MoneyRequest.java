package huce.edu.vn.MoneyManager.entity;

import java.math.BigDecimal;

public class MoneyRequest {
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    private BigDecimal amount;
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
