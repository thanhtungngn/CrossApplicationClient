import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Event} from '../models/event'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://localhost:12001/api/event'; // Your API endpoint

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  processEvent(id : string) : Observable<any> {
    return this.http.post<Event[]>(`${this.apiUrl}/process/${id}`, null);

  }
}
