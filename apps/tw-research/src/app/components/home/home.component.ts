import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from '@coscrad/api-interfaces';

@Component({
  selector: 'coscrad-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
}
