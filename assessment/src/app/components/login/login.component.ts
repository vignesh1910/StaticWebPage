import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public showVisibility = false;
  constructor(public formBuilder: FormBuilder,
              private commonService:CommonService,
              public snackBar: MatSnackBar
              ) { 
    this.loginForm = this.formBuilder.group({
      userid: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  close(): void {
    this.commonService.dialogRef.close();
  }

  login(formData: any) {
    const validData = this.checkUserIdPassword();
    if ( this.loginForm.valid && validData) {
      this.commonService.putCookies(this.loginForm.value['userid']);
      this.commonService.dialogRef.close();
    }
  }

  checkUserIdPassword() {
    const index = this.commonService.privateUserData.findIndex((elem) => (elem.userid === this.loginForm.value['userid']));
    if(index >= 0) {
      if(this.commonService.privateUserData[index].password !== this.loginForm.value['password']) {
         this.snackBar.open('Password is Incorrect', '',{duration: 5000, verticalPosition: 'top'});
         return false;
       }
    } else {
      this.snackBar.open('UserId does not exists', '', {duration: 5000, verticalPosition: 'top'});
      return false;
    }
    return true;
  }
}
