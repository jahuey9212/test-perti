import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public apiUrl:string;
  constructor(
    private _httpClient: HttpClient
    
  ) { 
    this.apiUrl ="https://randomuser.me/api";
  }

  getUserRandom(){
    return this._httpClient.get(this.apiUrl).toPromise();
  }

  getIdentity():Login{
    let identity = localStorage.getItem('identity');
    if(identity!=undefined && identity!=null){
      let obj = JSON.parse(identity);
      return new Login(obj.title,obj.first,obj.last,obj.username,obj.password,1);
    }else{
      return new Login('','','','','',0);
    }
  }

  
}
