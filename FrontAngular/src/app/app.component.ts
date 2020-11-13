import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'FrontAngular';

  historys: any;
  bookmarks: any;
  currentVideo = null;
  currentLink = '';
  currentIndex = -1;
  video_link = '';
  history = {
    video_link: '',
  };
  bookmark = {
    bookmark_link: '',
  };
  submitted = false;

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.retrieveVideos();
    this.retrieveVideosBookmark();
    this.retrieveTotalBookmark();
  }

  retrieveVideosBookmark(): void {
    this.videoService.getAllBookmark()
      .subscribe(
        data => {
          this.bookmarks = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveVideos(): void {
    this.videoService.getAllHistory()
      .subscribe(
        data => {
          this.historys = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveTotalBookmark(): void {
    this.videoService.getNumberBookmark()
      .subscribe(
        data => {
          (<HTMLInputElement>document.getElementById("numberbookmark")).innerHTML = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveVideos();
    this.retrieveVideosBookmark();
    this.retrieveTotalBookmark();
  }

  watchVideo(): void {
    console.log(this.videoService.getNumberBookmark());
    if(this.youtube_parser((<HTMLInputElement>document.getElementById("video_link")).value) != "false") {
      //console.log(this.parseVideoURL((<HTMLInputElement>document.getElementById("video_link")).value).link);
      this.currentLink = this.youtube_parser((<HTMLInputElement>document.getElementById("video_link")).value);
      console.log(this.currentLink);
      this.saveHistory();
      (<HTMLInputElement>document.getElementById("texterror")).innerHTML = '';
      (<HTMLInputElement>document.getElementById("numberbookmark")).innerHTML = '12';
      (<HTMLInputElement>document.getElementById("myvideo")).src = this.currentLink;
    }
    else {
      (<HTMLInputElement>document.getElementById("texterror")).innerHTML = 'Link must be a youtube link that : https://www.youtube.com/watch?v=';
    }
  }

  saveHistory(): void {
    const data = {
      video_link: this.currentLink,
    };
    this.videoService.createHistory(data)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  saveBookmark(): void {
    const data = {
      bookmark_link: this.currentLink
    };
    this.videoService.createBookmark(data)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  watchFromHistory(history): void {
    this.currentLink = history.video_link;
    this.saveHistory();
    (<HTMLInputElement>document.getElementById("myvideo")).src = this.currentLink;
    (<HTMLInputElement>document.getElementById("video_link")).value = this.currentLink;
  }

  watchFromBookmark(bookmark): void {
    this.currentLink = bookmark.bookmark_link;
    this.saveHistory();
    (<HTMLInputElement>document.getElementById("myvideo")).src = this.currentLink;
    (<HTMLInputElement>document.getElementById("video_link")).value = this.currentLink;
  }

  deleteOneHistory(history): void {
    this.videoService.deleteHistory(history.id)
      .subscribe(
        response => {
          this.refreshList();
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  deleteOneBookmark(bookmark): void {
    this.videoService.deleteBookmark(bookmark.id)
      .subscribe(
        response => {
          this.refreshList();
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }


  removeAllHistory(): void {
    this.videoService.deleteAllHistory()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = String(url).match(regExp);
    return (match&&match[7].length==11)? 'https://www.youtube.com/embed/'+match[7] : "false";
  }

}