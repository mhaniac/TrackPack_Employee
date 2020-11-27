import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from './globals';

@Injectable({
  providedIn: 'root'
})
export class UtiliesService {
  private attempts = 0;

  constructor(private http: HttpClient) { }

  generateUsername(name: string, last:string){
      name = name.toLowerCase();
      last = last.toLowerCase();
      return new Promise((resolve, reject) => {
        if(this.attempts === 0){
          const max = last.length;
          let userName = "";
          for(let i = 0; i < max ; i++){
            if(i === 0){
              userName+=name[i];
            }
            userName += last[i];
          }
          this.http.get(`${URL}/employee/validUsername?userName=${userName}`).subscribe((res:any) => {
            resolve(userName);
          }, (err:any) => {
            reject('Servicio no disponible');
          })
        }
      })
  }
}
