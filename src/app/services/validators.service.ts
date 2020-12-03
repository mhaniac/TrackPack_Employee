import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noRepeatCharacter(control: FormControl): { [s: string]: boolean }{
    if(control.value === null){
      return null;
    }
    const string = control.value.toLowerCase();


    for (let i = 0; i < string.length; i++) {
        if (i >= 2) {
            if (string[i] == string[i - 1] && string[i - 1] === string[i - 2] && string[i - 2] === string[i]) {
                return {
                  noRepeatCharacter: true
                }
            }
        }
    }
    return null;
  }

  
}
