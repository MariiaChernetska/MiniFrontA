import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import {Router} from '@angular/router';

import {RegService, RegError} from './reg.service'
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  providers: [RegService]
})
export class RegComponent implements OnInit {
  registerForm: FormGroup;
  emailValid: boolean = false;
  loginPristine: boolean = true;
  loginLength: boolean = false;
  passwordMatched: boolean = true;
  passwordPristine: boolean = true;
  errorMessage:Array<string> = [];
  repeatPristine: boolean = true;
  passwordsMatched: boolean = false;
  serverErrorMessages: RegServerError = new RegServerError();

  constructor(private regService: RegService, private router: Router) {
     
      this.registerForm = new FormGroup({
                          'email': new FormControl('', [Validators.required, this.emailPatternValidator]),
                          'fullName': new FormControl('', Validators.required),
                          'passwords': new FormArray([
                            new FormControl('', [Validators.required, this.passwordValidator]),
                            new FormControl('', Validators.required),
                            
                          ], this.matchValidator)});

      this.regService.regSuccess = ()=>this.router.navigate(['/login']);

      this.regService.regFail = (error)=> {
              let mythis = this;
              if(error.modelState['user.Login'] != undefined){
                        error.modelState['user.Login'].forEach(function(item, i, arr){
                           mythis.serverErrorMessages.loginErrors.push(item)
                        });
              }
              if(error.modelState['user.FullName'] != undefined){
                         error.modelState['user.FullName'].forEach(function(item, i, arr){
                         mythis.serverErrorMessages.fullNameErrors.push(item)
                        });
              }
              if(error.modelState['user.Password'] != undefined){
                        error.modelState['user.Password'].forEach(function(item, i, arr){
                           mythis.serverErrorMessages.passworErrors.push(item)
                        });
              }
              if(error.modelState['user.RepeatPassword'] != undefined){
                         error.modelState['user.RepeatPassword'].forEach(function(item, i, arr){
                         mythis.serverErrorMessages.confirmPasswordErrors.push(item)
                        });
              }
        };

           this.registerForm.controls['email'].statusChanges.subscribe((data) => {
            this.loginPristine = this.registerForm.controls['email'].pristine;
            (this.registerForm.hasError('emailInvalid', ['email'])) ? this.emailValid = false : this.emailValid = true;
      });


    (<FormArray>this.registerForm.controls['passwords']).controls[0].valueChanges.subscribe((data) => {
      this.passwordPristine = (<FormArray>this.registerForm.controls['passwords']).controls[0].pristine;
      ((<FormArray>this.registerForm.controls['passwords']).hasError('patternNotMatched', ["0"])) ? this.passwordMatched = false : this.passwordMatched = true;
      (this.registerForm.hasError('passwordsDontMatch', ['passwords'])) ? this.passwordsMatched = false : this.passwordsMatched = true;

    });
    (<FormArray>this.registerForm.controls['passwords']).valueChanges.subscribe((data) => {
      this.repeatPristine = (<FormArray>this.registerForm.controls['passwords']).controls[1].pristine;
      (this.registerForm.hasError('passwordsDontMatch', ['passwords'])) ? this.passwordsMatched = false : this.passwordsMatched = true;
    })
  }

      signIn() {
        let objToSend = {
           login: this.registerForm.controls['email'].value,
           fullName: this.registerForm.controls['fullName'].value,
           password: (<FormArray>this.registerForm.controls['passwords']).controls[0].value,
           repeatPassword: (<FormArray>this.registerForm.controls['passwords']).controls[1].value,
        };
        this.regService.sendRegData(objToSend).subscribe((res)=>{this.regService.regSuccess();}, 
              (error)=>{
                 
                    if(error !== undefined){
                     this.regService.regFail(JSON.parse(error._body)); 
                  }
              });
     
        }
  
          ngOnInit() {
        
          }

  emailPatternValidator(control: FormControl) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value)) {
      return null;
    }
    else {
      return {
        emailInvalid: true

      };
    }
  }
  passwordValidator(control: FormControl) {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(control.value)) {
      return null;
    }
    else {
      return {
        patternNotMatched: true

      };
    }
  }
  matchValidator(controlArr: FormArray) {
    if (controlArr.controls[0].value === controlArr.controls[1].value) {
      return null;
    }
    else {
      return {
        passwordsDontMatch: true
      };
    }
  }
}

class RegServerError{
  loginErrors = Array<string>(); 
  fullNameErrors = Array<string>();
  passworErrors = Array<string>();
  confirmPasswordErrors = Array<string>();
}

