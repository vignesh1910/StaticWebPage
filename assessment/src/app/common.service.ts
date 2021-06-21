import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {DialogComponent} from 'src/app/components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public privateUserData = [
    {userid: 'abc@media.com', password: 'abc123', username: 'tom'},
    {userid: 'def@media.com', password: 'def123', username: 'dick'}
  ];
  public isPrivateLogin = false;
  public loginUserData: any;
  public dialogRef: any;
  constructor(private cookieService: CookieService,
              public dialog: MatDialog) { this.getSavedUserFromCookie();}

  putCookies(usernameVal: string) {
    const userJsonObj = {"userid": usernameVal};
    this.cookieService.set( 'savedUserData', JSON.stringify(userJsonObj));
    this.cookieService.set( 'isPrivateUser', '1' );
    this.getSavedUserFromCookie();
  }

  getSavedUserFromCookie() {
    if(this.cookieService.get('savedUserData')) {
      const userData:any = JSON.parse(this.cookieService.get('savedUserData'));
      this.loginUserData = this.privateUserData.find((elem) => (elem.userid === userData.userid));
    }
    if(this.cookieService.get('isPrivateUser')) {
      this.isPrivateLogin = (this.cookieService.get('isPrivateUser') === '1') ? true : false;
    }
  }

  removeCookies() {
    this.cookieService.deleteAll();
  }

  openModal(data: any) {
    return this.dialogRef = this.dialog.open(DialogComponent, data);
  }
}