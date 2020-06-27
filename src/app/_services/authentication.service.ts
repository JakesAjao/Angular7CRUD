import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user'; 

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    url = 'https://localhost:44389/api/Angular7CRUDAPI/validate';
    header : any; 
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings);  
    }
    /*validateUser(username: string,password:string): Observable<boolean> {  
        return this.http.get<boolean>(this.url + '/' +'validate/username='+username +'&password='+password);  
      } */
    public get currentUserValue() {
        return this.currentUserSubject.value;
    }   
    validateUser(user: User): Observable<any> {          
        debugger;
        const httpOptions = { 
            headers: new HttpHeaders({ 'Content-Type': 'application/json'}) 
        };  
        this.currentUserSubject.next(user);
        return this.http.post<any>(this.url,user, httpOptions);         
      }      
    login(username, password) {
        return this.http.post<any>('${config.apiUrl}/users/authenticate', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    Login(user: User){  
        debugger;  
         var a =this.url;  
         this.currentUserSubject.next(user);
       return this.http.post<any>(this.url,user,{ headers: this.header});  
      }  

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}