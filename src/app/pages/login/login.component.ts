import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorize.service';
import {UserService} from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userList: User[];

    constructor(private socialAuthService: AuthService, private router: Router, private authorizeService: AuthorizeService, private userService: UserService) { }

    ngOnInit() {
        if (this.authorizeService.getUser()) {
            this.initUserFromDb(this.authorizeService.getUser());
        }
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
                this.initUserFromDb(userData);
            }
        );
    }

    private initUserFromDb(userData): void {
        this.userService.getConnectToList().snapshotChanges().subscribe(item => {
            this.userList = [];
            let findUser = null;
            item.forEach(element => {
                const user = element.payload.toJSON();
                user['$key'] = element.key;
                if (user['id'] === userData.id) {
                    findUser = user;
                }
            });
            if (findUser) {
                this.updateUser(userData, findUser);
            } else {
                this.addUser(userData);
            }
        });
    }

    private addUser(userData): void {
        const currentUser = {
            name: userData.name,
            email: userData.email,
            image: userData.image,
            role: 'user',
            id: userData.id
        };
        this.userService.add(currentUser);
        this.authorizeService.setUser(currentUser);
        this.router.navigate(['/home']);
    }

    private updateUser(userData, findUser): void {
        const currentUser = {
            name: userData.name,
            email: userData.email,
            image: userData.image,
            role: findUser.role,
            id: userData.id
        };
        this.userService.update(findUser['$key'], currentUser);
        this.authorizeService.setUser(currentUser);
        this.router.navigate(['/home']);
    }
}
