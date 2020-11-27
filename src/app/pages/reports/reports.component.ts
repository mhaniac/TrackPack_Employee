import { Component, OnInit } from '@angular/core';
import html2canvas from "html2canvas";
import  html2pdf from 'html2pdf.js'
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  data = [];
  dataHeader={name:'', last:'',type:'', date:''};

  constructor(private customerService: CustomerService, private userService: UserService) { }

  ngOnInit(): void {
  }

  getData(option: string){
    switch(option){
      case 'customer':
        this.customerService.getCustomers().subscribe((res: any) => {
          this.data = res.results;
          this.setTypeReport('Reporte de Clientes');
        },(err: any) => {
          Swal.fire({
            title: 'Error',
            text: err.error.error,
            icon: 'error'
          })
        })
        break;
    }
  }

  setTypeReport(type: string){
    this.dataHeader = { name: this.userService.user.name, last: this.userService.user.lastName, type, date: new Date().toISOString().substr(0,10).toString() };
  }

  generarPDF(){
    const options = {
      filename: 'report.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait' },
      margin: [0.54, 0.54]
    };
    window.scrollTo(0, 0);
    html2pdf().from(document.getElementById('export')).set(options).save();
}


}
