import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  html2pdf from 'html2pdf.js'
import { TrackingService } from 'src/app/services/tracking.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  bill = { customer: '', idTracking: 16, date: new Date().toLocaleString(), employee: '', show: false, address: '' };
  packages = [];
  total = 0;
  weight = 1;
  pricePerPound = 150;

  constructor(private trackingService: TrackingService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.billModal();
  }

  billModal(){
    Swal.fire({
      title: 'Ingrese el numero de tracking',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (idCarga) => {
        return this.trackingService.generateBill(idCarga).then((res: any) => {
          const { nombre, direccion } = res;
          this.bill = { customer: nombre, idTracking: idCarga, date: new Date().toLocaleString(), address: direccion, employee: `${this.userService.user.name} ${this.userService.user.lastName}`, show: true  }
          this.trackingService.getPackagesByLoadId(idCarga).then((res2: any) => {
            this.packages = res2;
            this.calcTotal();
          })
        }).catch((err: any) => {
          Swal.fire({
            title: 'Error al procesar la solicitud',
            icon: 'error',
            text: err,
            confirmButtonText: 'Aceptar'
          });
          this.router.navigateByUrl('/dashboard');
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  downloadBill(){
    const options = {
      filename: `${this.bill.idTracking}_${this.bill.customer}.pdf`,
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait' },
      margin: [0.54, 0.54]
    };
    window.scrollTo(0, 0);
    html2pdf().from(document.getElementById('print')).set(options).save();
  }

  calcTotal(){
    this.total = this.pricePerPound * this.weight;
  }

  resetValues(){
    this.bill = { customer: '', idTracking: 16, date: new Date().toLocaleString(), employee: '', show: false, address: '' };
    this.packages = [];
    this.total = 0;
    this.weight = 1;
    this.billModal();
  }

}
