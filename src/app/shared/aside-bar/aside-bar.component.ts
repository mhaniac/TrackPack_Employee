import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.css']
})
export class AsideBarComponent implements OnInit {

  public user = { name: '', lastName:'' }

  constructor(private userService: UserService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void { 
    this.getUserProfile();
  }

  async getUserProfile(){
    this.user = await this.userService.getUserProfile().then((res:any) => {
      return { name: res.name, lastName: res.lastName }
    });
  };

  logout(){
    this.loginService.removeToken();
    this.router.navigateByUrl('/login');
  }

}
