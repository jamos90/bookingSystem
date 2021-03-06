import {Component} from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: "bwm-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor( public authService: AuthService,
                 private router: Router ) {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    search(city:string) {
        // if(city) {
        //     this.router.navigate([`/rentals/${city}/homes`])
        // }
        // else {}
        // this.router.navigate(['/rentals'])
        city ? this.router.navigate([`/rentals/${city}/homes`]) : this.router.navigate(['/rentals']);
    }  
}