import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {JwtAuthService} from '../../../shared/services/auth/jwt-auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
    @ViewChild(MatProgressBar) progressBar: MatProgressBar;
    @ViewChild(MatButton) submitButton: MatButton;


    signInFormGroup: FormGroup;
    username: FormControl;
    password: FormControl;
    rememberMe: FormControl;

    errorMsg = '';
    // return: string;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private jwtAuth: JwtAuthService,
        private egretLoader: AppLoaderService,
        private router: Router,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        // this.signinForm = new FormGroup({
        //     username: new FormControl('Watson', Validators.required),
        //     password: new FormControl('12345678', Validators.required),
        //     rememberMe: new FormControl(true)
        // });
        this.signInFormGroup = new FormGroup({});
        this.username = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);
        this.rememberMe = new FormControl(true);

        this.signInFormGroup.addControl('username', this.username);
        this.signInFormGroup.addControl('password', this.password);
        this.signInFormGroup.addControl('rememberMe', this.rememberMe);


        // this.route.queryParams
        //   .pipe(takeUntil(this._unsubscribeAll))
        //   .subscribe(params => this.return = params['return'] || '/');
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    signin() {
        const signinData = this.signInFormGroup.value

        this.submitButton.disabled = true;
        this.progressBar.mode = 'indeterminate';

        this.jwtAuth.signin(signinData.username, signinData.password)
            .subscribe(() => {
                this.router.navigateByUrl(this.jwtAuth.return);
            }, err => {
                this.submitButton.disabled = false;
                this.progressBar.mode = 'determinate';
                this.errorMsg = err.message;
                // console.log(err);
            })
    }
}
