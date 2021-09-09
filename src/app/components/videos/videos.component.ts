import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  providers:[VideoService]
})
export class VideosComponent implements OnInit {

  public search:string;
  public videos: Array<Video>;
  constructor(
    private _videoService: VideoService
  ) { 
    this.videos = new Array();
    this.search = '';
  }

  ngOnInit(): void {
    this.getAllVideos();
  }

  onKeypressEvent(event: any){
    if (event.keyCode == 13) {
      if(this.search==''){
        this.getAllVideos();
      }else{
      this.searchVideos();
      }
    }
  }

  public async searchVideos() {
    await this._videoService.getSearchVideos(this.search).then((t: any) => {
      this.videos = t.map((obj: any) => {
        let item = obj.show;
        let image = 'assets/img/no-image.png';
        if(item.image!=null){
          image = item.image.medium;
        }
        return new Video(
          item.id,
          item.url,
          item.name,
          item.season,
          item.number,
          item.type,
          item.airdate,
          item.airtime,
          item.airstamp,
          item.runtime,
          image,
          item.summary,
          item._links,
          item._embedded
        );
      });
    });
  }

  private async getAllVideos() {
    await this._videoService.getAllVideos().then((t: any) => {
      this.videos = t.map((item: any) => {
        let image = 'assets/img/no-image.png';
        if(item.image==null){
          if(item._embedded.show.image!=null){
          image = item._embedded.show.image.medium;
          }
        }else{
          image = item.image.medium;
        }
        return new Video(
          item.id,
          item.url,
          item.name,
          item.season,
          item.number,
          item.type,
          item.airdate,
          item.airtime,
          item.airstamp,
          item.runtime,
          image,
          item.summary,
          item._links,
          item._embedded
        );
      });
    });
  }
}
