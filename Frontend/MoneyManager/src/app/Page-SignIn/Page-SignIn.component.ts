import { style } from '@angular/animations';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-Page-SignIn',
  templateUrl: './Page-SignIn.component.html',

  styleUrls: ['./Page-SignIn.component.css']
})
export class PageSignInComponent implements OnInit {
  user_information: any;
  newForm = this.fb.group({
    username: [''],
    password: [''],
  });
  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2,private fb: FormBuilder,private dataService: DataService,) { }

  ngOnInit(): void {

  }
  onSubmit(){
    let user: {
      username: string;
      password: string;
  }= {
    username: this.newForm.value.username as string,
    password: this.newForm.value.password as string,
}
   this.dataService.checkLogin(user.username,user.password).subscribe(
    (response:any)=>{
      //lưu thông tin người đăng nhập vào bộ nhớ
      const userId=response.body;
      localStorage.setItem('userId', userId);
      console.log("userid:",localStorage.getItem('userId'));
      //Lấy thông tin user dựa vào idUser
      this.getUserById(userId);
      let status=response.status;
      if (status === 200) {
        this.btn_SignIn();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Tài khoản hoặc mật khẩu không đúng?',
        });
      }
    },
    (error)=>{
      console.error(error);
    }
   );
  }

  btn_SignUp(): void {
    const iconloading = this.el.nativeElement.querySelector('#loadingpage');

    // Thực hiện thay đổi CSS
    if (iconloading) {
      this.renderer.setStyle(iconloading, 'display', 'flex');

    }
    setTimeout(() => {
      this.router.navigate(['/SignUp']);
    }, 500);

  }
  btn_SignIn(): void {
    const iconloading = this.el.nativeElement.querySelector('#loadingpage');

    // Thực hiện thay đổi CSS
    if (iconloading) {
      this.renderer.setStyle(iconloading, 'display', 'flex');

    }

    setTimeout(() => {
      this.wellcome(localStorage.getItem('userName'));
    }, 2000);
  }

  //lấy về thông tin người đang đăng nhập
  getUserById(id: any): void {
    this.dataService.getUserById(id).subscribe(
      (user) => {
        console.log('User data:', user);
        this.user_information = user;
        localStorage.setItem('userName', this.user_information.name);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
//Chao mung tro lai
  wellcome(name: any): void {

    Swal.fire({
      title: `Chào mừng trở lại ${name} !`,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/assets/Image/trees.png)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("/assets/Image/Conmeo.gif")
    left top
    no-repeat
  `
    });
    this.router.navigate(['/HomePage']);
  }
}
