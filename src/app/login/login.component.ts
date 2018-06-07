import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { Router } from '@angular/router';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private socialAuthService: AuthService, private router: Router, private authorizeService: AuthorizeService) { }
    ngOnInit() {
    }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        /*if (socialPlatform == 'facebook'){
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;*/
        if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform + ' Sign in data : ' , userData);
                this.authorizeService.setUser(userData);
                this.router.navigate(['/home']);
            }
        );
    }

}
