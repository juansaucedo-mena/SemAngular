import {Injectable} from "@angular/core";
import {LocalStoreService} from "../local-store.service";
import {HttpClient} from "@angular/common/http";
import {Router, ActivatedRoute} from "@angular/router";
import {map, catchError} from "rxjs/operators";
import {User} from "../../models/user.model";
import {of, BehaviorSubject, throwError} from "rxjs";
import {environment} from "environments/environment";
import {NavigationService} from "../navigation.service";

@Injectable({
    providedIn: "root",
})
export class JwtAuthService {
    token;
    isAuthenticated: Boolean;
    user: User = {};
    user$ = (new BehaviorSubject<User>(this.user));
    signingIn: Boolean;
    return: string;
    JWT_TOKEN = "JWT_TOKEN";
    APP_USER = "EGRET_USER";

    constructor(
        private ls: LocalStoreService,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private navigationService: NavigationService
    ) {
        this.route.queryParams
            .subscribe(params => this.return = params['return'] || '/');
    }

    public signin(username, password) {
        this.signingIn = true;
        return this.http.post(`${environment.apiURL}${environment.rutasLaravel.login.login}`, {username, password})
            .pipe(
                map((res: any) => {
                    this.setUserAndToken(res.access_token, this.user, !!res);
                    this.signingIn = false;
                    return res;
                }),
                catchError((error) => {
                    console.error(error);
                    return throwError(error);
                })
            );
    }

    public checkTokenIsValid() {
        return this.http.get(`${environment.apiURL}${environment.rutasLaravel.login.me}`)
            .pipe(
                map((profile: User) => {
                    this.setUserAndToken(this.getJwtToken(), profile, true);
                    this.navigationService.getMenuFromApi();
                    return profile;
                }),
                catchError((error) => {
                    this.signout();
                    return of(error);
                })
            );
    }

    public signout() {
        this.http.post(`${environment.apiURL}${environment.rutasLaravel.login.logout}`, {}).subscribe(() => {

        }).add(() => {
            this.setUserAndToken(null, null, false);
            this.router.navigateByUrl(environment.rutasAngular.login.iniciarSession);
        });
    }

    isLoggedIn(): Boolean {
        return !!this.getJwtToken();
    }

    getJwtToken() {
        return this.ls.getItem(this.JWT_TOKEN);
    }

    getUser() {
        return this.ls.getItem(this.APP_USER);
    }

    setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
        this.isAuthenticated = isAuthenticated;
        this.token = token;
        this.user = user;
        this.user$.next(user);
        this.ls.setItem(this.JWT_TOKEN, token);
        this.ls.setItem(this.APP_USER, user);
    }
}
