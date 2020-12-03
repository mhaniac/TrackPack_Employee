import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UtiliesService } from 'src/app/services/utilies.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fg: FormGroup;

  constructor(private formBuilder: FormBuilder, private utilService: UtiliesService, public loginService: LoginService, private router: Router, private validatorService: ValidatorsService) { }

  ngOnInit(): void {
    this.fg = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(5), this.validatorService.noRepeatCharacter, Validators.pattern(/^[A-Za-z0-9_.ñÑ]*$/)]],
      passwd: ["", [Validators.required, Validators.minLength(8)]]
    });
    console.log(this.loginService.getToken());
  }

  async onSubmit(){
    if(this.fg.valid){
      const user = { userLogin: this.fg.get('username').value, passwd: this.fg.get('passwd').value };
      this.loginService.login(user).subscribe((res: any) => {
        const { token } = res;
        this.loginService.setToken(token);
        this.router.navigateByUrl('/dashboard');
      }, (err: any) => {
        const error = err.error.error;
        this.loginService.setError(error);
      })
    }
  }


  //getters errors

  get getValidUsername(){
    return this.fg.get('username').touched && this.fg.get('username').invalid;
  }

  get getValidUsernameLength(){
    return this.fg.get('username').touched && this.fg.get('username').value.length < 5;
  }

  get getValidUsernamePattern(){
    return this.fg.get('username').touched && this.fg.get('username').errors && this.fg.get('username').errors.pattern;
  }

  get getValidUsernameCharacter(){
    return this.fg.get('username').touched && this.fg.get('username').errors && this.fg.get('username').errors.noRepeatCharacter;

  }

  get getValidPasswd(){
    return this.fg.get('passwd').touched && this.fg.get('passwd').invalid;
  }

  get getValidPasswdLength(){
    return this.fg.get('passwd').touched && this.fg.get('passwd').value.length < 8;
  }

}
