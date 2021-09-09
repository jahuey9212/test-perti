import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  public login:Login;
  public status:string;
  public class_pass:string
  public password:any;
  public message:string;

  constructor(
    private _router: Router,
    private page_title: Title,
    private _loginService:LoginService
  ) {
    this.login = new Login('','','','','',0);
    this.status = 'waiting';
    this.class_pass='bi bi-eye-fill';
    this.message = '';
   }

  ngOnInit(): void {
    this.login = this._loginService.getIdentity();
    /*if(this.login.session==1){
      setTimeout(() => {
        this._router.navigateByUrl('videos');
      }, 500);
    }*/
  }
  
  onSubmit(){
    let identity:Login = this._loginService.getIdentity();
    if(identity.title!=''){
      if((identity.username == this.login.username) && (identity.password == this.login.password)){
        this.status = 'success';
        this.notifyMe('Grupo Perti','Usuario Identificado Correctamente');
        this.message = "Usuario Identificado";
        setTimeout(() => {
          this._router.navigateByUrl('videos');
        }, 1000);
      }else{
        this.status = 'error';
        this.notifyMe('Grupo Perti (Error)','Credenciales no coinciden con usuario registrado');
        this.message = "Credenciales no coinciden con usuario registrado";
      }
    }else{
      this.status = 'error';
      this.notifyMe('Grupo Perti (Error)','Debe registrar el usuario para iniciar sesión');
      this.message = "Debe registrar el usuario para iniciar sesión";
    }
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

  showPass():void{
    this.password = document.getElementById('password');
    if ( this.password.type === "text" ) {
      this.password.type = "password"
      this.class_pass = 'bi bi-eye-fill';
    } else {
      this.password.type = "text"
      this.class_pass = 'bi bi-eye-slash-fill';
    }
  }
}
