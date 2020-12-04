import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackingService } from 'src/app/services/tracking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tracking',
  templateUrl: './update-tracking.component.html',
  styleUrls: ['./update-tracking.component.css']
})
export class UpdateTrackingComponent implements OnInit {

  formGroup: FormGroup;
  trackings = [];

  constructor(private formBuilder: FormBuilder, public trackingService: TrackingService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      idCarga: ["", [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    })
  }

  onSubmit(){
    if(this.formGroup.valid){
      const id = this.formGroup.get('idCarga').value;
      this.trackingService.getTrackingByLoad(id).subscribe((res: any) => {
        this.trackings = res.results;
      });
    }
  }

  updateTracking(idCarga: number, nombre: string){
    Swal.fire({
      title: 'Registro de tracking',
      text: `¿Estas seguro que deseas registrar el paquete con ID: ${idCarga} perteneciente a: ${nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#593196',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trackingService.getCurrentLocation().then((res: any) => {
          const { lat, lng } = res;
          this.trackingService.updateLocation(idCarga, lat, lng).then(() => {
            Swal.fire({
              title: 'Paquete reportado correctamente',
              icon: 'success'
            });
            this.onSubmit();
          }).catch((err) => {
            Swal.fire({ 
              title: 'Error al momento de reportar el paquete',
              text: err.error.error,
              icon: 'error'
            })
          })
        }).catch((error:any) => {
          Swal.fire({
            title: 'Error de localizacion',
            text: error,
            icon: 'error'
          })
        })
      }
    })
  }

  get invalidTracking(){
    return this.formGroup.get('idCarga').touched && this.formGroup.get('idCarga').invalid;
  }

  get invalidTrackingPatter(){
    return this.formGroup.get('idCarga').dirty && this.formGroup.get('idCarga').errors && this.formGroup.get('idCarga').errors.pattern;
  }

  get invalidTrackingRequired(){
    return this.formGroup.get('idCarga').touched && this.formGroup.get('idCarga').errors && this.formGroup.get('idCarga').errors.required;
  }

}
