import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-edit-giao-dich',
  templateUrl: './page-edit-giao-dich.component.html',
  styleUrl: './page-edit-giao-dich.component.css'
})
export class PageEditGiaoDichComponent implements OnInit {
  ngOnInit(): void {
    this.query.queryParams.subscribe(params => {
      let magd = params['magd'];
      const nhomgd = params['nhomgd'];
      const tengd = params['tengd'];
      const ngaygd = params['ngaygd'];
      const thoigiangd = params['thoigiangd'];
      const sotiengd = params['sotiengd'];
      const ghichu = params['ghichu'];
      const userid = params['userid'];

      // Sử dụng thông tin để thực hiện các thao tác cần thiết trên trang Edit-Users
      console.log('magd:', magd);
      console.log('nhomgd:', nhomgd);
      console.log('tengd:', tengd);
      console.log('ngaygd', ngaygd);
      console.log('thoigiangd', thoigiangd);
      console.log('sotiengd', sotiengd);
      console.log('ghichu', ghichu);
      console.log('userid', userid);
   //Chuyển đổi lại vào form
      let nhomgdnew = '';
      let tengdnew='';
      if (nhomgd === "Khoản thu") {
        nhomgdnew = 'khoanthu';
      } else if (nhomgd === "Khoản chi") {
        nhomgdnew = 'khoanchi';
      }
      if (tengd === "Ăn uống") {
        tengdnew = 'anuong';
      } else if (tengd === "Hoá Đơn") {
        tengdnew = 'hoadon';
      } else if (tengd === "Mua Sắm") {
        tengdnew = 'muasam';
      } else if (tengd === "Gia Đình") {
        tengdnew = 'giadinh';
      } else if (tengd === "Lương") {
        tengdnew = 'luong';
      } else if (tengd === "Thu Nhập Khác") {
        tengdnew = 'thunhapkhac';
      } else if (tengd === "Tiền chuyển đến") {
        tengdnew = 'tienchuyenden';
      } else if (tengd === "Thu Lãi") {
        tengdnew = 'thulai';
      } else if (tengd === "Khác") {
        tengdnew = 'khac';
      }

      this.newForm.setValue({
        nhomgd: nhomgdnew || '',
        tengd: tengdnew || '',
        ngaygd: ngaygd || '',
        thoigiangd: thoigiangd || '',
        sotiengd: sotiengd || '',
        ghichu: ghichu || '',
        userid: userid || ''
      });

    });

  }
  constructor(private router: Router, private fb: FormBuilder, private dataService: DataService, private query: ActivatedRoute) { }
  newForm = this.fb.group({
    nhomgd: [''],
    tengd: [''],
    ngaygd: [''],
    thoigiangd: [''],
    sotiengd: [''],
    ghichu: [''],
    userid: [localStorage.getItem('userId')]
  });

  btn_Save() {
    let magd: any;
    this.query.queryParams.subscribe(params => {
      magd = params['magd'];});
    this.updateGD(magd);
  }
  btn_back() {
    this.router.navigate(['/HomePage']);
  }
  updateGD(magd: any): void {
    const updatedData = this.newForm.value;
    const formDataAsString = JSON.stringify(updatedData);
    this.dataService.updateGiaodich(magd, formDataAsString).subscribe(
      (response) => {
        let OK=response.status;
        if(OK===200){
          Swal.fire({
            icon: 'success',
            title: 'Sửa giao dịch thành công!',
          }).then(() => {
                this.router.navigate(['/HomePage']);
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Sửa giao dịch không thành công!',
          });
        }
      },
      (error) => {
        console.error('Error updating giao dich:', error);
      }
    );
  }
}
