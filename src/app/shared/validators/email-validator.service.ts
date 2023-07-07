import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailValidator implements AsyncValidator{
  constructor() { }

  // Es opcional, por eso lo comentamos o borramos, no lo vamos a usar en este ejemplo
  //registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }


  //Al AbstractControl podemos verlo como un FormControl
  //Removemos el Promise<ValidationErrors | null> porque vamos a trabajar con observables
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log(control.value);
  //   console.log({email});

  //   return of({
  //     emailTaken: true //Si el email ya esta tomado, si ya se encuentra utilizado. En este caso, para el ejemplo
  //                        siempre devuelve true. Abajo otro ejemplo.
  //   })

  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log(control.value);
    const httpCallObservable = new Observable<ValidationErrors|null>((subscriber)=>{
      console.log({email});

      if (email === 'fernando@google.com'){
        subscriber.next({emailTaken:true});
        subscriber.complete();
        return; //No hace falta el return, el observable ya sabe, pero bueno lo puedo dejar.
      }

      subscriber.next(null);
      subscriber.complete();

    });

    return httpCallObservable;

  }



}
