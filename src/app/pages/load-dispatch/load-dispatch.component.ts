import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackingService } from 'src/app/services/tracking.service';
import Swal from 'sweetalert2';
import  html2pdf from 'html2pdf.js'
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-load-dispatch',
  templateUrl: './load-dispatch.component.html',
  styleUrls: ['./load-dispatch.component.css']
})
export class LoadDispatchComponent implements OnInit {

  @ViewChild('close') close;
  @ViewChild('open') open;

  formGroup: FormGroup;

  dispatchs = [];

  printGuide = {name: '', address: '', idTracking: 0, date: new Date().toLocaleString(), employee: '' };

  packages = [];

  constructor(private formBuilder: FormBuilder, private trackingService: TrackingService, private userService: UserService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      idCarga: ["", [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
    this.getDispatchs();
  }


  getDispatchs(){
      this.trackingService.getDispatchLoad().subscribe((res: any) => {
        this.dispatchs = res.results;
      })
  };

  async getPackagesByLoadId(idCarga: number){
    await this.trackingService.getPackagesByLoadId(idCarga).then((res: any) => {
      this.packages = res;
      this.open.nativeElement.click();
    })
  }



dispatchTracking(idCarga: number, nombre: string, direccion: string){
    Swal.fire({
      title: 'Despacho de tracking',
      text: `¿Estas seguro que deseas despachar la carga con ID: ${idCarga} perteneciente a: ${nombre} y dirección: ${direccion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#593196',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trackingService.dispatchLoad(idCarga).then((res: any) => {
          Swal.fire({
            title: 'Correcto',
            text: res,
            icon: 'success'
          });
          this.getDispatchs();
          this.printGuide = { name: nombre, address: direccion, idTracking: idCarga, date: new Date().toLocaleString(), employee: `${this.userService.user.name} ${this.userService.user.lastName}`  }
          this.getPackagesByLoadId(idCarga);
        }).catch((err) => {
          Swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          })
        })
      }
    })
  }

  printPDF(){
    console.log('imprimiendo')
    const options = {
      filename: `${this.printGuide.idTracking}_${this.printGuide.name}.pdf`,
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait' },
      margin: [0.54, 0.54]
    };
    window.scrollTo(0, 0);
    html2pdf().from(document.getElementById('print')).set(options).save();
}

resetData(){
  this.packages = [];
  this.printGuide = { name: '', address: '', idTracking: 0, date: new Date().toLocaleString(), employee: '' };
}

}
