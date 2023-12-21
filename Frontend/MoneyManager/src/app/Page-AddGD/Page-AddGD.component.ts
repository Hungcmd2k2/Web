import { DataService } from './../data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { Time } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-Page-AddGD',
  templateUrl: './Page-AddGD.component.html',
  styleUrls: ['./Page-AddGD.component.css']
})
export class PageAddGDComponent implements OnInit {

  newForm = this.fb.group({
    nhomgd: [''],
    tengd: [''],
    ngaygd: [''],
    thoigiangd: [''],
    sotiengd: [''],
    ghichu: [''],
    userid: [localStorage.getItem('userId')]
  });


  reloadPage() {
    const currentUrl = this.router.url;

    // Navigating to the same URL triggers a reload
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  constructor(private router: Router, private fb: FormBuilder, private dataService: DataService,) { }

  ngOnInit() {
  }



  btn_reset() {
    this.reloadPage();
  }
  btn_back(): void {
    this.router.navigate(['/HomePage']);
  }

  btn_Save(): void {
    //xuly ngaygd
    let ngaygdValue: string | number | null | undefined = this.newForm.value.ngaygd;
    let ngaygd: Date;
    if (ngaygdValue !== null && ngaygdValue !== undefined) {
      ngaygd = new Date(ngaygdValue);
    } else {

      ngaygd = new Date();
    }
    //xu ly tiengd
    let sotiengdValue: string | number | BigInt | null | undefined = this.newForm.value.sotiengd;
    let sotiengd: BigInt | string | number = BigInt(0);;
    if (sotiengdValue !== null && sotiengdValue !== undefined) {
      if (typeof sotiengdValue === 'string') {
        const numericValue = parseFloat(sotiengdValue);
        if (!isNaN(numericValue)) {
          sotiengd = BigInt(numericValue);
        } else {

        }
      } else {
        sotiengd = BigInt(sotiengdValue);
      }
    } else {
      sotiengd = BigInt(0);
    }

    let giaodich: {
      nhomgd: string;
      tengd: string;
      ngaygd: Date;
      thoigiangd: string;
      sotiengd: BigInt | string | number;
      ghichu: string;
    } = {
      nhomgd: this.newForm.value.nhomgd as string,
      tengd: this.newForm.value.tengd as string,
      ngaygd: ngaygd,
      thoigiangd: this.newForm.value.thoigiangd as string,
      sotiengd: sotiengd,
      ghichu: this.newForm.value.ghichu as string,
    };

    // Lấy giá trị từ form và xử lý về dạng json sau đó gửi lên server
    this.xulyinput();
  };
  //Xử lý form
  xulyinput(): void {

    const formData = this.newForm.value;
    if (formData.nhomgd === 'khoanchi') {
      formData.nhomgd = 'Khoản chi';
    }
    if (formData.nhomgd === 'khoanthu') {
      formData.nhomgd = 'Khoản thu';
    }
    if (formData.tengd === 'anuong') {
      formData.tengd = 'Ăn uống';
    }
    if (formData.tengd === 'hoadon') {
      formData.tengd = 'Hoá Đơn';
    }
    if (formData.tengd === 'muasam') {
      formData.tengd = 'Mua Sắm';
    }
    if (formData.tengd === 'giadinh') {
      formData.tengd = 'Gia Đình';
    }
    if (formData.tengd === 'luong') {
      formData.tengd = 'Lương';
    }
    if (formData.tengd === 'thunhapkhac') {
      formData.tengd = 'Thu Nhập Khác';
    }
    if (formData.tengd === 'tienchuyenden') {
      formData.tengd = 'Tiền chuyển đến';
    }
    if (formData.tengd === 'thulai') {
      formData.tengd = 'Thu Lãi';
    }
    if (formData.tengd === 'khac') {
      formData.tengd = 'Khác';
    }
    if (!formData.thoigiangd) {
      // Nếu thoigiangd không có giá trị, đặt giá trị là giờ hiện tại
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const seconds = currentTime.getSeconds().toString().padStart(2, '0');
      formData.thoigiangd = `${hours}:${minutes}:${seconds}`;
    }
    else {
      formData.thoigiangd = formData.thoigiangd + ':00';
    }
    if (!formData.nhomgd || !formData.tengd || !formData.ngaygd || !formData.sotiengd || !formData.ghichu) {
      Swal.fire({
        icon: 'error',
        title: 'Bạn chưa điền đủ thông tin',
      })
    }
    else {
      // Chuyển đổi tất cả giá trị thành dạng string
      const formDataAsString = JSON.stringify(formData);
      this.dataService.addGiaodich(formDataAsString,).subscribe(

        (response: HttpResponse<any>) => {
          // Xử lý kết quả ở đây
          let satatus = response.status;
          if (satatus == 201) {
            Swal.fire({
              icon: 'success',
              title: 'Thêm mới giao dịch thành công!',
            }).then(() => {
              this.callCongTienApi(localStorage.getItem('moneyId'),formData.sotiengd,formData.nhomgd);

            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Thêm mới giao dịch không thành công!',
            })
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

  }
  //Chỉnh sửa khoản thu khoản chi
  callCongTienApi(id: any, amount: any, type: any) {
    const moneyRequest = {
      amount: amount,
      type: type
    };

    this.dataService.congTien(id, moneyRequest).subscribe(
      (response) => {
        console.log('Gọi API money thành công', response);
        this.router.navigate(['/HomePage']);
      },
      (error) => {
        console.error('API error:', error);
      }
    );
}
}


