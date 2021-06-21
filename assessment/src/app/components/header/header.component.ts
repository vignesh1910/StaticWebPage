import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(public commonService: CommonService 
              ) { }
  ngOnInit(): void {
  }

  authMethod(val: boolean) {
    if(val === true) {
      this.commonService.openModal({disableClose: true, height: '53%',width: '40%',data:{component: LoginComponent, type: 'component'}});
    } else {
      this.commonService.removeCookies();
      this.commonService.isPrivateLogin = val;
    }
  }
}
