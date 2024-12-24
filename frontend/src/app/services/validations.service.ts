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
  //password = [Validators.required, Validators.minLength(6)];
  //mobile = [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]+$')];
  name = [Validators.required, Validators.minLength(2), Validators.maxLength(50)];
  //removeSpace = [Validators.required,Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$")]
  /*===========Validations Expression End here ===========*/
  //notRequired_validator = [];
  //required = [Validators.required];

  // email = [Validators.required, Validators.minLength(6), Validators.maxLength(150),
  // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,25}$')];

  // password = [Validators.required, Validators.minLength(6)];

  // mobile = [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]+$')];

  // name = [Validators.required, Validators.minLength(2), Validators.maxLength(50)];
  // removeSpace = [Validators.required, Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$")];
  // website = [Validators.required, Validators.maxLength(100), Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)];
  // website = [Validators.required, Validators.maxLength(100), Validators.pattern('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)')];
 
 
 // last old WebSite  12/10/2022-----------------------------------------
  // website = [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]; 
 
 
     /////// Latest Website 12/10/2022------------------------
  website = [Validators.required, Validators.maxLength(150), Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)];
 
 /*===========Validations Expression End here ===========*/





  /*=========== New Validations Expression Start here ===========*/

  // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,25}$')];



  // Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$") // fullName pattern
// Validators.pattern("^(([A-Za-z]+[,.]?[]?|[a-z]+['-]?)+)$") // firstname pattern


  removeSpace = [Validators.required, Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$")];
  // onKeyPress="if(this.value.length > 70) return false;"
  maxlength = [Validators.required, Validators.maxLength(50)]
  fullname = [Validators.required, Validators.maxLength(50), Validators.pattern("^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$")]; //^[a-zA-Z ]*$
  fisrtname = [Validators.required, Validators.maxLength(25), Validators.pattern("^(([A-Za-z]+[,.]?[]?|[a-z]+['-]?)+)$")]; //^[a-zA-Z ]*$
  lastname = [Validators.required, Validators.maxLength(25), Validators.pattern("^(([A-Za-z]+[,.]?[]?|[a-z]+['-]?)+)$")]; //^[a-zA-Z ]*$
  mobile = [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]+$')];
  
  address = [Validators.required,Validators.minLength(1), Validators.maxLength(200), Validators.pattern(/^((?!\s{2,}).)*$/)]

  textno = [Validators.required, Validators.minLength(2), Validators.maxLength(25),Validators.pattern(/^((?!\s{2,}).)*$/)];

  email = [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/),Validators.email]  

  postal = [Validators.required, Validators.maxLength(15),Validators.pattern(/^((?!\s{2,}).)*$/)];
  city_country = [Validators.required, Validators.maxLength(50), Validators.pattern(/^((?!\s{2,}).)*$/)];

  // website = [Validators.required, Validators.maxLength(150), Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)];
  shortbio = [Validators.required,Validators.minLength(2),Validators.maxLength(39),Validators.pattern(/^((?!\s{2,}).)*$/)]

  longbio = [Validators.maxLength(2000),Validators.pattern(/^((?!\s{2,}).)*$/)]
  password = [Validators.required, Validators.minLength(6), Validators.maxLength(30)];
  fsaarea = [Validators.required, Validators.maxLength(150)]
  fsacode = [Validators.required, Validators.maxLength(3),Validators.minLength(3),Validators.pattern(/^((?!\s{1,}).)*$/)]
  fsacodeforall = [Validators.maxLength(3),Validators.minLength(3),Validators.pattern(/^((?!\s{1,}).)*$/)]
  fsacode2 = [Validators.required, Validators.minLength(3), Validators.maxLength(3)]

  /*=========== New Validations Expression End here ===========*/
}