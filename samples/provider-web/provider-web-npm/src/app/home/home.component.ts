import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { AuthService } from './../shared/authenticate/auth.service';
import { AppStorageService } from './../app-storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CSRComponent } from './../csr/csr.component'
import { DashboardComponent } from './../dashboard/dashboard.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  private isCSR = false;
  private isProviderImpersonator: boolean = false;


  clearImpersonatorInSubscription: Subscription;
  constructor(private appService: AppService, private authService: AuthService,
    private storageService: AppStorageService, private router: Router) {
    this.isCSR = this.storageService.getCSRFromSession();
    this.isProviderImpersonator = this.storageService.getProviderImpersonatorFromSession();
    console.log('ITS CSR' + this.isCSR +'===>>'+ this.isProviderImpersonator);
    this.clearImpersonatorInSubscription = this.appService.getImpersonatorSubject().subscribe(v => {
      if(v.hasOwnProperty("isProviderImpersonator")&& !v.isProviderImpersonator){
        this.isProviderImpersonator = false;
      }
      console.log('clear impersonator'+ JSON.stringify(v));
   })
  }
  ngOnDestroy(){
    this.clearImpersonatorInSubscription.unsubscribe();
  }
  
}
