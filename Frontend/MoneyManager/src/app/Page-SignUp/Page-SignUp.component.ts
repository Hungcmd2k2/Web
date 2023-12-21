
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DataService, Users } from '../data.service';
import { FormBuilder } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-Page-SignUp',
  templateUrl: './Page-SignUp.component.html',
  styleUrls: ['./Page-SignUp.component.css']
})

export class PageSignUpComponent implements OnInit {

  newForm = this.fb.group({
    username: [''],
    password: [''],
    name: [''],
    phonenumber: [''],
    address: [''],
    email: ['']
  });

  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2, private fb: FormBuilder, private dataService: DataService,) { }

  ngOnInit() {
  }
  onSubmit() {
    let user: {
      username: string;
      password: string;
      name: string;
      phonenumber: string;
      address: string;
      email: string;
  } = {
      username: this.newForm.value.username as string,
      password: this.newForm.value.password as string,
      name: this.newForm.value.name as string,
      phonenumber: this.newForm.value.phonenumber as string,
      address: this.newForm.value.address as string,
      email: this.newForm.value.email as string,
  };


    const usernameToCheck = user.username;
    this.dataService.checkUsers(usernameToCheck).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response:', response);
        let statuscheckuser= response.status;
        // Xử lý kết quả ở đây
        if(statuscheckuser==202){
          Swal.fire({
            icon: 'error',
            title: 'Tên tài khoản đã tồn tại!',
          })
        }
        else if(statuscheckuser==203){
          this.dataService.addUsers(user).subscribe(
            (response: HttpResponse<any>) => {
              // Xử lý kết quả ở đây
              let satatus=response.status;
              if(satatus==201)
              {
                Swal.fire({
                  icon: 'success',
                  title: 'Thêm mới tài khoản thành công!',
                })
              }
              else
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Thêm mới tài khoản không thành công!',
                })
              }
            },
            (error) => {
              console.error('Error:', error);
              // Xử lý lỗi ở đây
            }
          );
        }


      },
      (error) => {
        console.error('Error:', error);
        // Xử lý lỗi ở đây
      }
    );

  }
  btn_SignIn(): void {
    const iconloading = this.el.nativeElement.querySelector('#loadingpage');

    // Thực hiện thay đổi CSS
    if (iconloading) {
      this.renderer.setStyle(iconloading, 'display', 'flex');

    }
    setTimeout(() => {
      this.router.navigate(['/SignIn']);
    }, 500);

  }
}
