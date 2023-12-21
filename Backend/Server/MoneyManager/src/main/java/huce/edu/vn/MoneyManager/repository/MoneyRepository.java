package huce.edu.vn.MoneyManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import huce.edu.vn.MoneyManager.entity.Money;

@Repository
public interface MoneyRepository extends JpaRepository<Money, Long> {
    List<Money> findByUserid(int userid);
}
