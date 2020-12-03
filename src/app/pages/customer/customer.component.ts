import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers = [];

  showInactive = false;

  formModal: FormGroup;

  userPasswdChange = { id:0, name:'' }

  @ViewChild('cancel') cancel;
  constructor(public customerService: CustomerService, private fromBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCustomers();
    this.formModal = this.fromBuilder.group({
      passwd: ['', [Validators.required, Validators.minLength(8)]],
      passwd2: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


  getCustomers(){
    this.customerService.getCustomers().subscribe((res: any) => {
      this.customers = res.results;
      this.showInactive = false;
    })
  }

  deleteCustomer(id: number, name: string){
    Swal.fire({
      title: 'Confirmacion',
      text: `¿Seguro que desea eliminar a ${name}? Si lo haces el no podra iniciar sesion.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#593196',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        this.customerService.deleteCustomer(id).then((res: any) => {
          this.getCustomers();
          this.customerService.removeError();
          Swal.fire({
            title: 'Correcto',
            text: res,
            icon: 'success',
            confirmButtonText: 'Listo'
          });
          
        }).catch((err:any) => {
          this.customerService.setError(err);
          Swal.fire({
            title: 'Error',
            text: err,
            icon: 'error',
            confirmButtonText: 'Listo'
          });
        });
      }
    })
  }

  showIncativeCustomers(){
    this.customerService.getIvactiveCustomers().subscribe((res: any) => {
      this.customers = res.results;
      this.showInactive = !this.showInactive
    });
  }

  updatePassword(id: number, name: string){
    this.userPasswdChange = { id, name };
  }

  reactiveCustomer(id: number, name: string){
    Swal.fire({
      title: 'Reactivacion',
      text: `¿Seguro que desea reactivar la cuenta de: ${name}? Si lo hace el usuario podra iniciar sesion de nuevo`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#593196',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, reactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.customerService.reactiveCustomer(id).then((res: any) => {
          Swal.fire({
            title: 'Correcto',
            text: res,
            icon: 'success'
          });
        }).catch((err: any) => {
          Swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          });
        }).finally(() => {
          this.getCustomers();
        })
      }
    })
  }

  onSubmit(){
    if(this.formModal.valid){
      const id = this.userPasswdChange.id;
      const passwd = this.formModal.get('passwd').value;
      this.userPasswdChange = { id: 0, name: '' };
      this.customerService.changePassword(id, passwd).subscribe((res: any) => {
        this.customerService.removeError();
        Swal.fire({
          title: 'Correcto',
          text: res.message,
          icon: 'success'
        })
        this.cancel.nativeElement.click();
      }, (err: any) => {
        this.customerService.setError(err.error.error);
        Swal.fire({
          title: 'Error',
          text: err.error.error,
          icon: 'error'
        })
        this.customers
      })
    }
  }

  resetForm(){
    this.formModal.reset();
    this.customerService.removeError();
  }

  get validPasswd(){
    return this.formModal.get('passwd').touched && this.formModal.get('passwd').invalid;
  }

  get equalPasswd(){
    return this.formModal.get('passwd').dirty && this.formModal.get('passwd').value !== this.formModal.get('passwd2').value
  }

  get requiredPasswd(){
    return this.formModal.get('passwd').touched && this.formModal.get('passwd').errors && this.formModal.get('passwd').errors.required;
  }

  get minPasswd(){
    return this.formModal.get('passwd').touched && this.formModal.get('passwd').errors && this.formModal.get('passwd').errors.minlength;
  }

  get requiredPasswd2(){
    return this.formModal.get('passwd2').touched && this.formModal.get('passwd2').errors && this.formModal.get('passwd2').errors.required;
  }

  get minPasswd2(){
    return this.formModal.get('passwd2').touched && this.formModal.get('passwd2').errors && this.formModal.get('passwd2').errors.minlength;
  }

  get validPasswd2(){
    return this.formModal.get('passwd2').touched && this.formModal.get('passwd2').invalid;
  }

}
