import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public apiUrl:string;
  public apiUrlSearch:string;
  constructor(
    private _httpClient: HttpClient
  ) { 
    this.apiUrl = 'http://api.tvmaze.com/schedule/full';
    this.apiUrlSearch = 'http://api.tvmaze.com/search/shows?q=';
  }

  getAllVideos():Promise<Object>{
    return this._httpClient.get(this.apiUrl).toPromise();
  }

  getSearchVideos(search:string):Promise<Object>{
    return this._httpClient.get(this.apiUrlSearch+search).toPromise();
  }
}
