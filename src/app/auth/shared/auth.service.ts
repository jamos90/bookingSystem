import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import 'rxjs/Rx';


class DecodedToken {
    exp: number = 0;
    userName: string = ''
}


@Injectable()
export class AuthService {
    private decodedToken;

    constructor( private http: HttpClient) {
        //assigns a value to decoded token on component load. 
        this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken;
    }

   public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
    }

    public login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/auth', userData).map(
            //implicet retrun to return the token to the login function in front end.
            (token: string)=> this.saveToken(token));
    }

    public isAuthenticated():boolean {
      return moment().isBefore(this.getExperationTime());
    }

    public getAuthedToken(): string {
        return localStorage.getItem('bwm_auth')
    }

    public getUserName():string {
        return this.decodedToken.userName;
    }

    private saveToken(token: string):string {
        this.decodedToken = jwt.decode(token);
        localStorage.setItem('bwm_auth', token);
        localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
        return token;
    }

    public logout() {
        
        localStorage.removeItem('bwm_auth');
        localStorage.removeItem('bwm_meta');

        this.decodedToken = new DecodedToken;
    }

    private getExperationTime() {
       return moment.unix(this.decodedToken.exp);
    }
}