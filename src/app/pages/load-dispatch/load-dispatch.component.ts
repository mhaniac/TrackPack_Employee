import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackingService } from 'src/app/services/tracking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-dispatch',
  templateUrl: './load-dispatch.component.html',
  styleUrls: ['./load-dispatch.component.css']
})
export class LoadDispatchComponent implements OnInit {

  formGroup: FormGroup;

  dispatchs = [];

  printGuide = { show: false ,name: 'Angel Jose Castillo', address: 'La Paz, La Paz, Honduras', idTracking: 124, date: new Date().toLocaleString(), employee: 'ADMIN ADMIN' };

  packages = [];

  constructor(private formBuilder: FormBuilder, private trackingService: TrackingService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      idCarga: ["", [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
    this.getDispatchs();
    this.getPackagesByLoadId(8)
  }


  getDispatchs(){
      this.trackingService.getDispatchLoad().subscribe((res: any) => {
        this.dispatchs = res.results;
      })
  };

  async getPackagesByLoadId(idCarga: number){
    this.trackingService.getPackagesByLoadId(idCarga).then((res: any) => {
      this.packages = res;
      console.log(res);
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

}
