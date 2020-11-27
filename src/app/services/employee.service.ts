import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  error = { show: false, message:'' }

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getEmployees(){
    const headers = new HttpHeaders({
      token: this.loginService.getToken()
    })
    return this.http.get(`${URL}/employee`, { headers });
  }

  saveEmployee(user:any){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.post(`${URL}/employee`,user ,{headers}).subscribe((res: any) => {
        resolve(res.message);
      },(err:any) => {
        reject(err.error.error);
      })
    });
  }



  //Controlador del error por parte del backend
  setError(message: string){
    this.error = { show: true, message }
  }

  removeError(){
    this.error = { show: false, message: '' }
  }

  getError(){
    return this.error;
  }
}
