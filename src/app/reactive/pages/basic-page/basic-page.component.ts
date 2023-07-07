import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

  //Creando el formulario reactivo
  // public myForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl('',[/*validaciones sincronas*/],[/*validaciones asincronas*/]),
  //     price: new FormControl(0), //si no hay validaciones no es necesario poner los corchetes
  //     inStorage: new FormControl(0)
  //   }
  // )

  // Podemos crear el mismo formulario de otra forma
  //Esta forma parece mas "limpia" ya que nos ahorramos de poner en cada campo el FormControl
  public myForm: FormGroup = this.fb.group({
    //prop: [['valor'], [validaciones sincronas], [validaciones asincronas]]
    name: ['',[Validators.required, Validators.minLength(3)],[]],
    price: [0, [Validators.required, Validators.min(3)]], //si no hay validaciones no es necesario poner los corchetes
    inStorage: [0, [Validators.required, Validators.min(3)]]
  })

  //Lo enlazamos con el .html con [formGroup]="myForm" y a cada input le ponemos formControlName y le ponemos el nombre del campo que definimos
  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
  }

  //Hacemos un método para el manejo de muchas validaciones
  isValidField( field:string ):boolean | null {
    //return myForm.controls['name'].getError('required') && myForm.controls['name'].touched
    //el getError es para un error específico
    //el errors es para ver si tiene algun tipo de error

    console.log(this.myForm.controls[field].errors );
    return this.myForm.controls[field].errors &&
           this.myForm.controls[field].touched
  }


  getFieldError(field:string ):string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch(key){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`
      }
    }

    return null;
  }
  onSave():void{

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); //Marca todos los campos como si hubiesen sido tocados.
      //Esto es para cuando damos click al botón guardar sin tocar ningún campo, para que salte la validación de touched
      return;
    }
    console.log(this.myForm.value);
  }
}
