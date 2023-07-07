import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    //myForm2 es lo mismo que lo que escribo abajo
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]

    ])
  })

  public newFavorite: FormControl = new FormControl('',Validators.required)

  constructor( private fb: FormBuilder ){}

  //Getter
  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }


  isValidField( field:string ):boolean | null {
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

    return 'Hola Mundo'
  }

  isValidFieldInArray( formArray: FormArray, index: number ){
    return formArray.controls[index].errors &&
           formArray.controls[index].touched
  }

  onAddFavorite():void{
    if ( this.favoriteGames.invalid ) return;
    const newGame = this.newFavorite.value;
    //Esto seria si NO ESTUVIERA trabajando con el formBiulder
    //this.favoriteGames.push( new FormControl(newGame, Validators.required))

    //Pero como estoy trabajando con el formBiulder lo hacemos así:
    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index:number):void{
    //Le paso el arreglo que regresa el getterm y en JS al pasarse todo por referencia, al borrar aca se va a borrar en el arreglo directamente
    this.favoriteGames.removeAt(index);
    //removeAt propio de los arreglos
  }

  onSubmit():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    //Para eliminar el formulario de la vista, no se muy bien para que lo hizo
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset();
  }
}
