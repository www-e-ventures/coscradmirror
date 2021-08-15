import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MediaItem, Message } from '@coscrad/api-interfaces';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'coscrad-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  mediaItem: MediaItem;

  callApi(): void {
    this.http
      .get<MediaItem>(`${env.server.url}/api/hello`)
      .subscribe((result: MediaItem) => {
        this.mediaItem = result;
      });
  }

  callSecureApi(): void {
    this.http
      .get<MediaItem>(`${env.server.url}/api/hello`)
      .subscribe((result: MediaItem) => {
        this.mediaItem = result;
      });
  }
}
