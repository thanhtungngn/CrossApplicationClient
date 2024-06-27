import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:12001/api'; // Update this to your API

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/User/GetAllUsers`);
  }

  getUserById(id: string): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/User/GetUserById?userId=${id}`);
  }

  updateUser(id: string, user: User): Observable<any> {
      return this.http.put<User>(`${this.baseUrl}/User/UpdateUserProfile?userId=${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/User/DeleteUser?userId=${id}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/User/addUser`, user);
  }
}
