import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender:['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  //A modo de ejemplo creamos una persona que podria mostrarse luego por pantalla
  public person = {
    gender: 'F',
    wantNotification: false
  }
  constructor(private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField( field:string ):boolean | null {
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched
  }

  onSave():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }



    //Aca como desestructura para sacar el termsAndConditions que en person no está, pero si en el formulario
    const { termsAndConditions, ...newPerson } = this.myForm.value;


    console.log(this.myForm.value);
    this.person = newPerson;
  }

}
