import { response } from 'express';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService, Users } from '../data.service';
import { HttpResponse } from '@angular/common/http';
Router
@Component({
  selector: 'app-Page-Home',
  templateUrl: './Page-Home.component.html',
  styleUrls: ['./Page-Home.component.css']

})
export class PageHomeComponent implements OnInit {
  giaodich: any;
  user_information: any;
  money: any;
  isButtonDisabled: boolean = true; // Khai báo và khởi tạo biến
  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2, private dataService: DataService) { }

  ngOnInit() {

    this.getGiaodichByUserId(localStorage.getItem('userId'));
    this.hideLiBasedOnUserId(localStorage.getItem('userId'));
    this.getMoneyByUserId(localStorage.getItem('userId'))
    this.getUserById(localStorage.getItem('userId'));
  }
  //lấy về thông tin người đang đăng nhập
  getUserById(id: any): void {
    this.dataService.getUserById(id).subscribe(
      (user) => {
        console.log('User data:', user);
        this.user_information = user;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  //lấy giao dịch dựa theo userid
  getGiaodichByUserId(userid: any) {
    this.dataService.getGiaodichByUserid(userid).subscribe(
      (data) => {
        this.giaodich = data;
        console.log('Dữ liệu giao dịch:', data);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }
  //lấy số tiền Money theo người dùng
  getMoneyByUserId(userid: any) {
    this.dataService.getMoneyByUserid(userid).subscribe(
      (datamoney) => {
        this.money = datamoney;
        // Kiểm tra nếu mảng không rỗng trước khi truy cập phần tử đầu tiên
        if (this.money.length > 0) {
          console.log("money", this.money[0]);
          console.log("id money:", this.money[0].id);
          localStorage.setItem('moneyId', this.money[0].id);
          console.log("ID MONEY LOCAL", localStorage.getItem('moneyId'));
        } else {
          console.log("Mảng money rỗng");
          Swal.fire({
            position: "top",
            icon: "question",
            title: "Có vẻ như bạn chưa có ví !",
            showConfirmButton: true,
            timer: 6000
          });
          this.isButtonDisabled = false;
        }
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }
  //Thêm ví cho người dùng khi mới tạo nick
  async AddMoney(): Promise<void> {
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Tạo ví ",
      inputPlaceholder: "100000VND",
      inputAttributes: {
        "aria-label": "Nhập số dư ví của bạn..."
      },
      showCancelButton: true
    });
    if (text) {
      this.AddWallet(text, localStorage.getItem('userId'));
      Swal.fire("Thêm ví thành công").then(() => {
        const currentUrl = this.router.url;
        // Navigating to the same URL triggers a reload
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      });
    }
  }

  //phân quyền
  hideLiBasedOnUserId(userId: any) {
    if (userId != '1') {
      const liElement = document.getElementById('hidenli');
      if (liElement) {
        liElement.classList.add('hidden');
      }
    } else {

    }
  }
  //
  btn_AddGD(): void {
    const iconloading = this.el.nativeElement.querySelector('#loadingpage');

    if (iconloading) {
      this.renderer.setStyle(iconloading, 'display', 'flex');

    }
    setTimeout(() => {
      this.router.navigate(['/AddGD']);
    }, 500);

  }
  btn_Out(): void {
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


  reloadGiaodich(): void {
    const currentUrl = this.router.url;
    // Navigating to the same URL triggers a reload
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  //Xoá giao dịch
  onDeleteGiaodich(magd: any): void {
    Swal.fire({
      title: "Bạn Chắc chắn muốn xoá?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đúng",
      cancelButtonText: "Không"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteGiaodich(magd).subscribe(
          (response) => {
            // Xử lý kết quả thành công nếu cần
            let OK = response.status;
            if (OK === 200) {
              Swal.fire({
                title: "Xoá Thành Công!",
                icon: "success"
              }).then(() => {
                const currentUrl = this.router.url;
                // Tải lại trang sau khi xoá
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate([currentUrl]);
                });
              });
            }
            else {
              Swal.fire({
                title: "Xoá Không Thành Công!",
                icon: "error"
              });
            }
          },
          (error) => {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi xoá giao dịch', error);
          }
        );

      }
    });


  }
  //Update giao dịch
  onUpdateGiaodich(magd: any, nhomgd: any, tengd: any, ngaygd: any, thoigiangd: any, sotiengd: any, ghichu: any, userid: any): void {
    this.router.navigate(['/Edit-GD'], {
      queryParams: {
        magd,
        nhomgd,
        tengd,
        ngaygd,
        thoigiangd,
        sotiengd,
        ghichu,
        userid
      }
    });
  }
  //Thêm ví mới
  AddWallet(sodu: any, userid: any): void {
    const walletRequest = {
      sodu: sodu,
      khoanthu: 0,
      khoanchi: 0,
      userid: userid
    };
    this.dataService.addMoneyWallet(walletRequest).subscribe(
      (response: HttpResponse<any>) => {
        // Xử lý kết quả ở đây

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  btn_thongke(): void {
    this.Thongke(localStorage.getItem('userId'));
  }
  //Chuyen trang thống kê
  Thongke(userId: any): void {
    this.router.navigate(['/ThongKe'], {
      queryParams: {
        userId
      }
    });

  }
  //btn Sửa số dư
  async Suasodu(): Promise<void> {
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Sửa số dư ví ",
      inputPlaceholder: "100000VND",
      inputAttributes: {
        "aria-label": "Nhập số dư ví của bạn..."
      },
      showCancelButton: true
    });
    if (text) {
      this.callCongTienApi(localStorage.getItem('moneyId'), text, "sodu");
      Swal.fire("Sửa số dư thành công!").then(() => {
        const currentUrl = this.router.url;
        // Navigating to the same URL triggers a reload
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      });
    }
  }
  //gọi api sửa số dư
  callCongTienApi(id: any, amount: any, type: any) {
    const moneyRequest = {
      amount: amount,
      type: type
    };
    this.dataService.congTien(id, moneyRequest).subscribe(
      (response) => {
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }
  //Tìm kiếm giao dịch
  onSelectChange(event: any): void {
    // Lấy giá trị được chọn
    const selectedValue = event.target.value;

    // Gọi hàm hoặc thực hiện các công việc cần thiết dựa trên giá trị được chọn
    switch (selectedValue) {
      case "0":
        // Gọi hàm hoặc thực hiện công việc khi chọn "Tháng Này"
        console.log("Chọn Tháng Này");
        const TimeRequest = {
          "startDate": "2023-12-01",
          "endDate": "2023-12-31",
          "userId": localStorage.getItem('userId')
        };
        this.dataService.getGiaodichByTime(TimeRequest).subscribe(
          (response) => {
            this.giaodich = response.body;
          },
          (error) => {
            console.error('API error:', error);
          }
        );
        break;
      case "1":
        // Gọi hàm hoặc thực hiện công việc khi chọn "Tháng Trước"
        console.log("Chọn Tháng Trước");
        const TimeRequest2 = {
          "startDate": "2023-11-01",
          "endDate": "2023-11-30",
          "userId": localStorage.getItem('userId')
        };
        this.dataService.getGiaodichByTime(TimeRequest2).subscribe(
          (response) => {
            this.giaodich = response.body;
          },
          (error) => {
            console.error('API error:', error);
          }
        );

        break;
      case "2":
        // Gọi hàm hoặc thực hiện công việc khi chọn "Tuần này"
        console.log("Chọn Tuần này");
        const TimeRequest3 = {
          "startDate": "2023-12-18",
          "endDate": "2023-12-24",
          "userId": localStorage.getItem('userId')
        };
        this.dataService.getGiaodichByTime(TimeRequest3).subscribe(
          (response) => {
            this.giaodich = response.body;
          },
          (error) => {
            console.error('API error:', error);
          }
        );
        break;
      default:
        // Các xử lý mặc định (nếu cần)
        break;
    }
  }
}

