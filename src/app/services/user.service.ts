import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7279/api'; // Update this to your API

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/User/GetAllUsers`);
  }

  getUserById(id: string): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/User/GetUserById?userId=${id}`);
  }

  updateUser(user: User): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}/User/UpdateUserProfile?userId=${user.id}`, user);
  }

  deleteUser(id: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/User/DeleteUser?userId=${id}`);
  }
}
