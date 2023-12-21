import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-page-edit-users',
  templateUrl: './page-edit-users.component.html',
  styleUrl: './page-edit-users.component.css'
})
export class PageEditUsersComponent  implements OnInit{

  ngOnInit(): void {
    this.query.queryParams.subscribe(params => {
      const id = params['id'];
      const username = params['username'];
      const password = params['password'];
      const name = params['name'];
      const phonenumber = params['phonenumber'];
      const address = params['address'];
      const email = params['email'];

      // Sử dụng thông tin để thực hiện các thao tác cần thiết trên trang Edit-Users
      console.log('ID:', id);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Name:', name);
    console.log('Phone Number:', phonenumber);
    console.log('Address:', address);
    console.log('Email:', email);
    this.newForm.setValue({
      name: name || '',
      phonenumber: phonenumber || '',
      address: address || '',
      email: email || '',
      username: username || '',
      password: password || '',
    });
    });
  }

  newForm = this.fb.group({
    name: [''],
    phonenumber: [''],
    email: [''],
    address: [''],
    username: [''],
    password: [''],
  });

  constructor(private router: Router, private fb: FormBuilder, private dataService: DataService,private query:ActivatedRoute) { }
  onSubmit(){
    this.query.queryParams.subscribe(params => {
      const id = params['id'];
      this.updateUserData(id);
    });

  }

  updateUserData(id: any): void {
    const updatedData = this.newForm.value;
    const formDataAsString = JSON.stringify(updatedData);
    this.dataService.updateUser(id, formDataAsString).subscribe(
      (response) => {
        let OK=response.status;
        if(OK===200){
          Swal.fire({
            icon: 'success',
            title: 'Sửa tài khoản thành công!',
          }).then(() => {
                this.router.navigate(['/Users']);
          });
        }
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
