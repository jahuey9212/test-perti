import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './models/login';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})
export class AppComponent implements OnChanges{
  title = 'test-perti';
  public session:Login;

  constructor(
    private _router:Router,
    private _loginService:LoginService
  ){
    this.session = this._loginService.getIdentity(); 
  }

  ngOnChanges(){
    this.session = this._loginService.getIdentity(); 
  }
  
  closeSession(){
    localStorage.removeItem('identity');
    this._router.navigateByUrl('/');
  }
}
