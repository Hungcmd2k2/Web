package huce.edu.vn.MoneyManager.service;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import huce.edu.vn.MoneyManager.entity.Money;
import huce.edu.vn.MoneyManager.repository.MoneyRepository;
import jakarta.transaction.Transactional;

@Service
public class MoneyServiceImpl implements MoneyService {
    @Autowired
    MoneyRepository moneyRepo;

    @Override
    public Money getMoneyByID(Long id) {
        return moneyRepo.findById(id).get();
    }

    @Override
    public void createMoney(Money money) {
        moneyRepo.save(money);
    }

    @Override
    public void updateMoney(Long id, Money money) {
        money.setId(id);
        moneyRepo.save(money);
    }

    @Override
    public boolean existsById(Long id) {
        return moneyRepo.existsById(id);
    }

    @Override
    public void deleteMoney(Long id) {
        moneyRepo.deleteById(id);
    }

    @Override
    public void deleteMoneyAll() {
        moneyRepo.deleteAll();
    }

    @Override
    public Collection<Money> getMoneys() {
        return moneyRepo.findAll();
    }

    @Override
    public List<Money> getMoneyByUserid(int userid) {
        return moneyRepo.findByUserid(userid);
    }

    @Transactional
    public void congTien(Long id, BigDecimal amount, String loai) {
        Money money = moneyRepo.findById(id).orElse(null);
        if (money != null) {
            if ("Khoản thu".equals(loai)) {
                money.setKhoanthu(money.getKhoanthu().add(amount));
                money.setSodu(money.getSodu().add(amount));
            } else if ("Khoản chi".equals(loai)) {
                money.setKhoanchi(money.getKhoanchi().add(amount));
                money.setSodu(money.getSodu().subtract(amount));
            } else if ("sodu".equals(loai)) {
                money.setSodu(amount);
            }
            moneyRepo.save(money);
        }
    }
}
