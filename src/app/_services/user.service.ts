import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { User } from '../user'; 

@Injectable({ providedIn: 'root' })
export class UserService {
    url = 'https://localhost:44389/api/Angular7CRUDAPI';
    constructor(private http: HttpClient) { }

    getAllUser(): Observable<User[]> {  
        return this.http.get<User[]>(this.url );  
      }  
      getUserId(Id: string): Observable<User> {  
        return this.http.get<User>(this.url + '/' + Id);  
      } 
      createUser(user: User): Observable<User> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.post<User>(this.url,  
        user, httpOptions);  
      }  
      updateUser(user: User): Observable<User> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.put<User>(this.url,  
        user, httpOptions);  
      }  
      deleteUserById(id: string): Observable<number> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.delete<number>(this.url+"/" +id,  
     httpOptions);  
      }  

    getAll() {
        return this.http.get<any[]>('${config.apiUrl}/users');
    }

    register(user) {
        return this.http.post('${config.apiUrl}/users/register', user);
    }

    delete(id) {
        return this.http.delete('${config.apiUrl}/users/${id}');
    }
}
