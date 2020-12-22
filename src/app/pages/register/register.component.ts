import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { URL } from '../../services/globals';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('cancel') cancel;

  employees = [];
  formModal: FormGroup;

  constructor(public employeeService: EmployeeService, private formBuilder: FormBuilder, private validatorService: ValidatorsService, private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getEmployees();

    this.formModal = this.formBuilder.group({
      userLogin: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z0-9_.ñÑ]*$/), this.validatorService.noRepeatCharacter]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z áéíóúÁÉÍÓÚñÑ]*$/), this.validatorService.noRepeatCharacter]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z áéíóúÁÉÍÓÚñÑ]*$/), this.validatorService.noRepeatCharacter]],
      passwd: ['', [Validators.required, Validators.minLength(8)]],
      passwd2: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  deleteEmployee(id: number, user: string){
    console.log(id);
    Swal.fire({
      title: `Eliminar a: ${user}`,
      text: "¿Estas seguro que deseas eliminarlo? Esta acción no se podrá deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#593196',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => { 
      if (result.isConfirmed) {
        Swal.queue([{
          title: 'Ingresa tu contraseña para continuar',
          input: 'password',
          inputAttributes: {
            autocapitalize: 'off'
          },
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#593196',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          showLoaderOnConfirm: true,
          cancelButtonText: 'Cancelar',
          preConfirm: (passwd) => {
              return new Promise((resolve, reject) => {
                const headers = new HttpHeaders({ 
                  token: this.loginService.getToken()
                })
                this.http.post(`${URL}/employee/verify-password`, {passwd}, { headers }).subscribe((res:any) => {
                  this.http.delete(`${URL}/employee?idEmpleado=${id}`, { headers }).subscribe((res2:any) => {
                    this.getEmployees();
                    Swal.fire({
                      title: 'Completado',
                      text: 'Empleado eliminado correctamente',
                      icon: 'success'
                    });
                    resolve();
                  },(err2:any) => {
                    Swal.fire({
                      title: 'Error',
                      text: err2.error.error,
                      icon: 'error',
            
                    });
                    reject();
                  })
                }, (err: any) => {
                  Swal.fire({
                    title: 'Error',
                    text: err.error.error,
                    icon: 'error'
                  })
                  reject(err.error.error);
                })
          })
        }
      }])
  }})}

  onSubmit(){
    if(this.formModal.valid){
      const user = { nombre: this.formModal.get('nombre').value, apellido: this.formModal.get('apellido').value, userLogin: this.formModal.get('userLogin').value, passwd: this.formModal.get('passwd').value }
      console.log(user);
      this.employeeService.saveEmployee(user).then((res) => {
        this.getEmployees();
        this.employeeService.removeError();
        this.cancel.nativeElement.click();
        Swal.fire({
          title: res,
          icon: 'success'
        })
        this.resetForm()
      }).catch((err: any) => {
        this.employeeService.setError(err);
      })
    }
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe((res:any) => {
      console.log(res);
      this.employees = res.results;
    }, (err: any) => {
      console.log(err);
    });
  }

  resetForm(){
    this.formModal.reset();
    this.formModal.markAsPristine();
    this.employeeService.removeError();
  }


  //Getter validations for username

  get invalidUsername(){
    return this.formModal.get('userLogin').touched && this.formModal.get('userLogin').invalid;
  }

  get invalidUsernameLength(){
    return this.formModal.get('userLogin').touched && this.formModal.get('userLogin').errors && this.formModal.get('userLogin').errors.minlength;
  }

  get invalidUsernameRequired(){
    return this.formModal.get('userLogin').touched && this.formModal.get('userLogin').errors && this.formModal.get('userLogin').errors.required;
  }

  get invalidUsernamePattern(){
    return this.formModal.get('userLogin').touched && this.formModal.get('userLogin').errors && this.formModal.get('userLogin').errors.pattern;
  }

  get invalidUsernameRepeat(){
    return this.formModal.get('userLogin').touched && this.formModal.get('userLogin').errors && this.formModal.get('userLogin').errors.noRepeatCharacter;
  }

  //Getters validations for name

  get invalidName(){
    return this.formModal.get('nombre').touched && this.formModal.get('nombre').invalid;
  }

  get invalidNameLength(){
    return this.formModal.get('nombre').touched && this.formModal.get('nombre').errors && this.formModal.get('nombre').errors.minlength;
  }

  get invalidNameRequired(){
    return this.formModal.get('nombre').touched && this.formModal.get('nombre').errors && this.formModal.get('nombre').errors.required;
  }

  get invalidNamePattern(){
    return this.formModal.get('nombre').touched && this.formModal.get('nombre').errors && this.formModal.get('nombre').errors.pattern;
  }

  get invalidNameRepeat(){
    return this.formModal.get('nombre').touched && this.formModal.get('nombre').errors && this.formModal.get('nombre').errors.noRepeatCharacter;
  }

    //Getters validations for lastname

    get invalidLast(){
      return this.formModal.get('apellido').touched && this.formModal.get('apellido').invalid;
    }
  
    get invalidLastLength(){
      return this.formModal.get('apellido').touched && this.formModal.get('apellido').errors && this.formModal.get('apellido').errors.minlength;
    }
  
    get invalidLastRequired(){
      return this.formModal.get('apellido').touched && this.formModal.get('apellido').errors && this.formModal.get('apellido').errors.required;
    }
  
    get invalidLastPattern(){
      return this.formModal.get('apellido').touched && this.formModal.get('apellido').errors && this.formModal.get('apellido').errors.pattern;
    }

    get invalidLastRepeat(){
      return this.formModal.get('apellido').touched && this.formModal.get('apellido').errors && this.formModal.get('apellido').errors.noRepeatCharacter;
    }


    //Getter validations for password

    get equalPasswd(){
      return this.formModal.get('passwd').dirty  &&  this.formModal.get('passwd').value !== this.formModal.get('passwd2').value ;
    }

    get onlyEqualPasswd(){
      return this.formModal.get('passwd').value === this.formModal.get('passwd2').value ;
    }

    get invalidPasswdLength(){
      return this.formModal.get('passwd').touched && this.formModal.get('passwd').errors && this.formModal.get('passwd').errors.minlength;
    }

    get invalidPasswd(){
      return this.formModal.get('passwd').touched && this.formModal.get('passwd').invalid;
    } 

    get invalidPasswdRequired(){
      return this.formModal.get('passwd').touched && this.formModal.get('passwd').errors && this.formModal.get('passwd').errors.required;
    }

    get invalidPasswd2Length(){
      return this.formModal.get('passwd2').touched && this.formModal.get('passwd2').errors && this.formModal.get('passwd2').errors.minlength;
    }

    get invalidPasswd2(){
      return this.formModal.get('passwd2').touched && this.formModal.get('passwd2').invalid;
    } 

    get invalidPasswd2Required(){
      return this.formModal.get('passwd2').touched && this.formModal.get('passwd2').errors && this.formModal.get('passwd2').errors.required;
    }



}
