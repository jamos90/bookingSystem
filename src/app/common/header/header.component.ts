import {Component} from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
    selector: "bwm-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private authService: AuthService) {}

}