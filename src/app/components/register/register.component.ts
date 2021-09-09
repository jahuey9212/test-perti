import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[LoginService]
})
export class RegisterComponent implements OnInit {

  public login:Login;
  public status:string;

  constructor(
    private _loginService:LoginService
  ) { 
    this.status = 'waiting';
    this.login = new Login('','','','','',0);
  }

  ngOnInit(): void {
    this.getUserRandom();
  }

  private async getUserRandom(){
    await this._loginService.getUserRandom().then( t => {
      let response:any = t;
      let results = response.results[0];
      this.login = new Login(results.name.title,results.name.first,results.name.last,results.login.username,results.login.password,1);
    });
  }
  
  notifyMe(title:string, body:string) {
    var options = {
      body: body,
      icon: '/assets/img/logo-perti.png'
    }

    let notification:Notification;
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }else if (Notification.permission === "granted") {
      notification = new Notification(title,options);
    }else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          notification = new Notification("Notificación Rechazada por el Usuario");
        }
      });
    }
  }

  onSubmit(){
    this.status = 'waiting';
    localStorage.setItem('identity',JSON.stringify(this.login));
    this.status = 'success';
    this.notifyMe('Registro de Usuario','El usuario se registro correctamente en el LocalStorage')
  }
}
