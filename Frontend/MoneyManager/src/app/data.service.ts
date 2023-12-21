import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { response } from 'express';
export interface Users {
  id: number;
  username: string;
  password: string;
  name: string;
  phonenumber: string;
  address: string;
  email: string;
  money: BigInt;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  rootURL = "http://localhost:8080";
  constructor(private http: HttpClient) { }
  //get all ds users
  getUsersList(): Observable<Array<Users>> {
    return this.http.get<Array<Users>>(this.rootURL + "/users/all");
  }
  //them users
  addUsers(users: any): Observable<HttpResponse<any>> {
    return this.http.post(this.rootURL + "/users/add", users, {
      observe: 'response'
    });
  }
  //kiem tra username password dang nhap
  checkLogin(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post<HttpResponse<any>>(`${this.rootURL}/users/check`, body, {
      observe: 'response'
    });
  }

  //kiem tra ten username da ton tai chua
  checkUsers(usersname: any): Observable<HttpResponse<any>> {
    return this.http.get(this.rootURL + "/users/exists/" + usersname, {
      observe: 'response'
    })
  }

  //cap nhat users
  updateUser(id: any, userData: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.rootURL}/users/${id}`;
    return this.http.put(url, userData, {
      headers: headers,
      observe: 'response'
    });
  }
  //xoa users theo id user
  deleteUsers(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.rootURL}/users/${id}`, {
      observe: 'response'
    });
  }
  //lấy về dữ liệu user theo id
  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.rootURL}/users/${id}`);
  }
  //==========================================================================================//
  //Thêm giao dịch
  addGiaodich(giaodichs: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootURL + "/giaodich/add", giaodichs, {
      headers: headers,
      observe: 'response'
    });
  }
  //Xoá giao dịch theo magd
  deleteGiaodich(magd: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.rootURL}/giaodich/${magd}`, {
      observe: 'response'
    });
  }
  //Lấy về danh sách giao dịch theo userid
  getGiaodichByUserid(userid: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.rootURL}/giaodich/${userid}`);
  }
  //Cập nhật giao dịch
  updateGiaodich(magd: any, GiaodichData: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.rootURL}/giaodich/${magd}`;
    return this.http.put(url, GiaodichData, {
      headers: headers,
      observe: 'response'
    });
  }
  //Lấy về ds giao dịch theo thời gian theo userid (tìm kiếm)
  getGiaodichByTime(request: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootURL + "/giaodich/search", request, {
      headers: headers,
      observe: 'response'
    });
  }
  //==========================================================================//
  //Lấy về dữ liệu money để hiển thị dành riêng cho user qua userid đó
  getMoneyByUserid(userid: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.rootURL}/money/${userid}`);
  }
  //Thay đổi khoản thu khoản chi khi thêm giao dịch
  congTien(id: number, moneyRequest: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.rootURL}/money/congtien/${id}`, moneyRequest, {
      headers: headers,
      observe: 'response'
    });
  }
  //Thêm ví money cho user theo userid
  addMoneyWallet(wallet: any): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootURL + "/money/add", wallet, {
      headers: headers,
      observe: 'response'
    });
  }
  //===================================================================//
  //Thống kê của admin
  // calculateTotalByTengd(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.rootURL}/giaodich/calculateTotalByTengd`);
  // }
  //Thống kê các tên gd theo userid
  calculateTotalByTengdAndUserId(userid: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.rootURL}/giaodich/calculateTotalByTengdAndUserId/${userid}`);
  }
  //Thống kê chi tiêu theo từng tháng
  calculateTotalByNhomgdAndUserId(request: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.rootURL + "/giaodich/tongtien/thang", request, {
      headers: headers
    });
  }

}
