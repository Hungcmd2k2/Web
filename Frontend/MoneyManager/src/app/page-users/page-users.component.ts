import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService,Users } from '../data.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-page-users',
  templateUrl: './page-users.component.html',
  styleUrl: './page-users.component.css'
})
export class PageUsersComponent implements OnInit {
  users : any;
  constructor(private router: Router,private dataService: DataService,private location: Location){}
  ngOnInit(): void{
   this.displayUserAll();

  }

  displayUserAll() : void{
    this.dataService.getUsersList().subscribe(data => {
      this.users = data;
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  btn_Out():void{
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
  }

  onDeleteUsers(id: any): void {
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
        this.dataService.deleteUsers(id).subscribe(
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
            console.error('Lỗi khi xoá Users', error);
          }
        );

      }
    });
  }

  onEditUsers(id:any,username:any,password:any,name:any,phonenumber:any,address:any,email:any):void{
    this.router.navigate(['/Edit-Users'],{
      queryParams: {
        id,
        username,
        password,
        name,
        phonenumber,
        address,
        email
      }
    });
  }
}
