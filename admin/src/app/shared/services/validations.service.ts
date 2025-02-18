import { Injectable } from '@angular/core';
import { Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }
  /*===========Validations Expression Start here ===========*/
  notRequired_validator = [];
  required = [Validators.required];

  // email = [Validators.required, Validators.minLength(6), Validators.maxLength(150),
  // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,25}$')];

  // password = [Validators.required, Validators.minLength(6)];

  // mobile = [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]+$')];

  // name = [Validators.required, Validators.minLength(2), Validators.maxLength(50)];
  // removeSpace = [Validators.required, Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$")];
  website = [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)];
  /*===========Validations Expression End here ===========*/



  /*=========== New Validations Expression Start here ===========*/

  // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,25}$')];
  removeSpace = [Validators.required, Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$")];
  maxlength = [Validators.required, Validators.maxLength(50)]
  maxlength250 = [Validators.required, Validators.maxLength(250)]
  maxlength350 = [Validators.required, Validators.maxLength(250)]
  fullname = [Validators.required, Validators.maxLength(50), Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$")]; //^[a-zA-Z ]*$
  fisrtname = [Validators.required, Validators.maxLength(25), Validators.pattern("^(([A-Za-z]+[,.]?[]?|[a-z]+['-]?)+)$")]; //^[a-zA-Z ]*$
  lastname = [Validators.required, Validators.maxLength(25), Validators.pattern("^(([A-Za-z]+[,.]?[]?|[a-z]+['-]?)+)$")]; //^[a-zA-Z ]*$
  mobile = [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]+$')];

  textno = [Validators.required, Validators.minLength(2), Validators.maxLength(25),Validators.pattern(/^((?!\s{2,}).)*$/)];

  email = [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/),Validators.email];
  address = [Validators.required, Validators.maxLength(200)]
  postal = [Validators.required, Validators.maxLength(25),Validators.pattern(/^((?!\s{2,}).)*$/)];
  shortbio = [Validators.required, Validators.maxLength(39), Validators.pattern(/^((?!\s{2,}).)*$/)];

  note = [Validators.required, Validators.minLength(2), Validators.maxLength(200),Validators.pattern(/^((?!\s{2,}).)*$/)];

  longbio = [Validators.maxLength(2000),Validators.pattern(/^((?!\s{2,}).)*$/)]
  password = [Validators.required, Validators.minLength(6), Validators.maxLength(50)];
  fsaarea = [Validators.required, Validators.maxLength(150)]
  fsacode = [Validators.required, Validators.maxLength(3),Validators.pattern(/^((?!\s{1,}).)*$/)]
  /*=========== New Validations Expression End here ===========*/

}
