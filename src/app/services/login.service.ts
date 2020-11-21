import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL = 'http://localhost:3300';
  public error = { show: false, message: "" };
  constructor(private http: HttpClient) { }

  login(user:any){
    return this.http.post(`${this.URL}/login/employee`, user);
  }

  setError(error: string){
    this.error = { show: true, message: error }
  }

  cleanError(){
    this.error = { show: false, message: '' }
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    const token = localStorage.getItem('token')? localStorage.getItem('token') : 'null';
    return token;
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  isLogged(){
    const headers = new HttpHeaders({
      token: this.getToken()
    })
    return this.http.get(`${this.URL}/auth/verify`, { headers });
  }
}
