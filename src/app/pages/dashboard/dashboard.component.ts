import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { StadisticService } from 'src/app/services/stadistic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stadistic = { totalP: 0, totalE: 0, totalC: 0 };
  constructor(private stadisticService: StadisticService) { }

  ngOnInit(): void {
    this.getSatdistics();
  }

  async getSatdistics(){
    this.stadistic = await this.stadisticService.getDashboardStadistic().then((res:any) => {
      return { totalP: res.totalP, totalE: res.totalE, totalC: res.totalC };
    }).catch((err) => {
      return { totalC: 0, totalP: 0, totalE: 0 };
    })
  }

}
