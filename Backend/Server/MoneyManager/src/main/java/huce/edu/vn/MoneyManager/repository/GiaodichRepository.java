package huce.edu.vn.MoneyManager.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import huce.edu.vn.MoneyManager.entity.Giaodich;

@Repository
public interface GiaodichRepository extends JpaRepository<Giaodich, Long> {
    List<Giaodich> findByUserid(int userid);

    @Query("SELECT g.tengd, SUM(g.sotiengd) FROM Giaodich g GROUP BY g.tengd")
    List<Object[]> calculateTotalByTengd();

    @Query("SELECT tengd, userid, SUM(sotiengd) AS total FROM Giaodich WHERE userid = :userid GROUP BY tengd, userid")
    List<Object[]> calculateTotalByTengdAndUserId(@Param("userid") Long userid);

    List<Giaodich> findByNgaygdBetweenAndUserid(LocalDate startDate, LocalDate endDate, Long userId);
    
    List<Giaodich> findByNgaygdBetweenAndUseridAndNhomgd(LocalDate startDate, LocalDate endDate, Long userId, String nhomgd);
}
