import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-page-thong-ke',
  templateUrl: './page-thong-ke.component.html',
  styleUrl: './page-thong-ke.component.css'
})
export class PageThongKeComponent implements OnInit {
  results: any[] = [];
  datathu1: any;
  datachi1: any;
  chartOptions1: Highcharts.Options = {};
  chartOptions2: Highcharts.Options = {};
  chartOptions3: Highcharts.Options = {};
  showChart2: boolean = false;
  showChart3: boolean = false;
  constructor(private dataService: DataService, private router: Router, private query: ActivatedRoute) { }
  Highcharts = Highcharts; // Import Highcharts vào component
  ngOnInit(): void {
    //chart1
    this.laydatachartcuaGiaodich();
    //chart2
    this.laydatachartThangnay();
    //chart3
    this.laydatachartThangtruoc();
  }
  //
  laydatachartcuaGiaodich(): void {
    this.query.queryParams.subscribe(params => {
      let userId = params['userId'];
      this.dataService.calculateTotalByTengdAndUserId(userId).subscribe(dulieu => {
        this.results = dulieu;
        console.log(dulieu);
      })
      const categories = this.results.map(item => item[0]); // Chuyển đổi sang kiểu string
      const values = this.results.map(item => item[2]);     // Mảng chứa các số (200, 100)

      this.chartOptions1 = {
        chart: {
          type: 'column',
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: categories, // Tên cột
        },
        yAxis: {
          title: {
            text: 'VND', // Tên hàng
          },
        },
        accessibility: {
          enabled: false, // Tắt tính năng accessibility
        },
        plotOptions: {
          column: {
            color: '#7cb5ec', // Màu sắc cột
          },
        },
        series: [
          {
            name: 'Giao Dịch',
            type: 'column',
            data: values,
          },
        ],
      };
    });
  }
  laydatachartThangnay(): void {
    this.query.queryParams.subscribe(params => {
      let userId = params['userId'];
      const thangnaychi = {
        "startDate": "2023-12-01",
        "endDate": "2023-12-31",
        "userId": userId,
        "nhomgd": "Khoản chi"
      };
      const thangnaythu = {
        "startDate": "2023-12-01",
        "endDate": "2023-12-31",
        "userId": userId,
        "nhomgd": "Khoản thu"
      };

      // Gọi cả hai API
      const khoanchiObservable = this.dataService.calculateTotalByNhomgdAndUserId(thangnaychi);
      const khoanthuObservable = this.dataService.calculateTotalByNhomgdAndUserId(thangnaythu);

      // Kết hợp cả hai observable bằng forkJoin
      forkJoin([khoanchiObservable, khoanthuObservable]).subscribe(
        (results) => {
          // Đây là nơi xử lý dữ liệu khi cả hai observable đều đã hoàn thành
          this.datachi1 = results[0];
          this.datathu1 = results[1];
          console.log("thu, chi", this.datathu1, this.datachi1);
          this.showchart2(this.datathu1, this.datachi1);
        },
        (error) => {
          console.error('Lỗi khi gọi API:', error);
        }
      );
    });
  }
  laydatachartThangtruoc(): void {
    this.query.queryParams.subscribe(params => {
      let userId = params['userId'];
      const thangtruocchi = {
        "startDate": "2023-11-01",
        "endDate": "2023-11-30",
        "userId": userId,
        "nhomgd": "Khoản chi"
      };
      const thangtruocthu = {
        "startDate": "2023-11-01",
        "endDate": "2023-11-30",
        "userId": userId,
        "nhomgd": "Khoản thu"
      };

      // Gọi cả hai API
      const khoanchiObservable = this.dataService.calculateTotalByNhomgdAndUserId(thangtruocchi);
      const khoanthuObservable = this.dataService.calculateTotalByNhomgdAndUserId(thangtruocthu);

      // Kết hợp cả hai observable bằng forkJoin
      forkJoin([khoanchiObservable, khoanthuObservable]).subscribe(
        (results) => {
          // Đây là nơi xử lý dữ liệu khi cả hai observable đều đã hoàn thành
          this.datachi1 = results[0];
          this.datathu1 = results[1];
          console.log("thu, chi", this.datathu1, this.datachi1);
          this.showchart3(this.datathu1, this.datachi1);
        },
        (error) => {
          console.error('Lỗi khi gọi API:', error);
        }
      );
    });
  }
  showchart2(datathu: any, datachi: any): void {
    console.log("data:", datathu, datachi)
    this.chartOptions2 = {
      chart: {
        type: 'column',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: ['Thu', 'Chi'], // Tên cột
      },
      yAxis: {
        title: {
          text: 'VND', // Tên hàng
        },
      },
      accessibility: {
        enabled: false, // Tắt tính năng accessibility
      },
      plotOptions: {
        column: {
          color: 'green', // Màu sắc cột
        },
      },
      series: [
        {
          name: 'Tháng này',
          type: 'column',
          data: [datathu, datachi],
        },
      ],
    };
    this.showChart2 = true;
  }

  showchart3(datathu: any, datachi: any): void {
    console.log("data:", datathu, datachi)
    this.chartOptions3 = {
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Tháng trước',
          type: 'pie',
          data: [
            { name: 'Thu', y: datathu },
            { name: 'Chi', y: datachi },
          ],
        },
      ],
    };

    this.showChart3 = true;
  }
  Thongke(): void {
  }

  btn_Out() {
    Swal.fire({
      title: "Đăng Xuất khỏi tài khoản?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.router.navigate(['/SignIn']);
        }, 800);
      }
    });
    localStorage.removeItem('userId');
    localStorage.removeItem('moneyId');
  }


}
