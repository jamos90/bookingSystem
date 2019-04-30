import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

    constructor( private http: HttpClient) {}


   public register(userData: any): Observable<any> {
       console.log(userData);
    return this.http.post('/api/v1/users/register', userData);
    }

}