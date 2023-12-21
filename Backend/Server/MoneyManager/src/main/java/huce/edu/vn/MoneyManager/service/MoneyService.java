package huce.edu.vn.MoneyManager.service;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

import huce.edu.vn.MoneyManager.entity.Money;

public interface MoneyService {
    public abstract Money getMoneyByID(Long id);

    public abstract void createMoney(Money money);

    public abstract void updateMoney(Long id, Money money);

    public abstract void deleteMoney(Long id);

    public abstract void deleteMoneyAll();

    public abstract boolean existsById(Long id);

    public abstract Collection<Money> getMoneys();

    public List<Money> getMoneyByUserid(int userid);

    public void congTien(Long id, BigDecimal amount, String loai);

}
