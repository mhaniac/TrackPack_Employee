import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackingService } from '../../services/tracking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-tracking',
  templateUrl: './register-tracking.component.html',
  styleUrls: ['./register-tracking.component.css']
})
export class RegisterTrackingComponent implements OnInit {

  formGroup: FormGroup;
  tracks = [];

  constructor(private formBuilder: FormBuilder, private trackingService: TrackingService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      tracking: ["", [Validators.required, Validators.pattern(/^[A-Za-z0-9]*$/)]]
    })
  }

  onSubmit(){
    if(this.formGroup.valid){
      const tracking = this.formGroup.get('tracking').value;
      this.trackingService.getPackagesByTracking(tracking).subscribe((res: any) => {
        this.tracks = res.results;
      }, (err:any) => {

      })
    }else{
      this.tracks = [];
    }
  }

  registerPackage(id: number, tracking: string, name: string){
    Swal.fire({
      title: 'Registro de carga',
      text: `¿Estas seguro que deseas registrar el paquete con tracking: ${tracking} perteneciente a: ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#593196',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trackingService.registerPackage(id).then(()=>{
          Swal.fire(
            'Registrado',
            'El paquete ha sido registrado correctamente',
            'success'
          ),
          this.onSubmit();
        }).catch((err) => {
          Swal.fire(
            'Error',
            err,
            'error'
          )
        })
      }
    })
  }

  get invalidTracking(){
    return this.formGroup.get('tracking').touched && this.formGroup.get('tracking').invalid;
  }

  get invalidTrackingPatter(){
    return this.formGroup.get('tracking').dirty && this.formGroup.get('tracking').errors && this.formGroup.get('tracking').errors.pattern;
  }

  get invalidTrackingRequired(){
    return this.formGroup.get('tracking').touched && this.formGroup.get('tracking').errors && this.formGroup.get('tracking').errors.required;
  }


}
