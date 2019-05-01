import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';


@Injectable()
export class AuthService {

    constructor( private http: HttpClient) {}


   public register(userData: any): Observable<any> {
       console.log(userData);
    return this.http.post('/api/v1/users/register', userData);
    }

    public login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/auth', userData).map(
            //implicet retrun to return the token to the login function in front end.
            (token: string)=> this.saveToken(token));
    }

    private saveToken(token: string):string {
        localStorage.setItem('bwm_auth', token);
        return token;
    }

}