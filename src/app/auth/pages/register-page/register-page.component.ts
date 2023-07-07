import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
//import {cantBeStrider} from 'src/app/shared/validators/validator';
//import * as customValidators from 'src/app/shared/validators/validator';

@Component({
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    // name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    // username: ['', [Validators.required, customValidators.cantBeStrider]],
    name:      ['', [Validators.required, Validators.pattern(this.validatorServices.firstNameAndLastnamePattern)]],
    email:     ['', [Validators.required, Validators.pattern(this.validatorServices.emailPattern)],[new EmailValidator()]],
    username:  ['', [Validators.required, this.validatorServices.cantBeStrider]],
    password:  ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  },{
    validators:[
      this.validatorServices.isFieldOneEqualFieldTwo('password', 'password2')
    ]

  })

  constructor(private fb: FormBuilder,
              private validatorServices: ValidatorsService){}

  isValidField(field: string){

    return this.validatorServices.isValidField(this.myForm, field);

  }

  onSubmit():void{
    this.myForm.markAllAsTouched();
    console.log(this.myForm);
  }



}
