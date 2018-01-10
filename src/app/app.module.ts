import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage} from "../pages/login/login"

import {Http, HttpModule, XHRBackend} from "@angular/http"
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Test } from '../components/test/test';
import { JwtClient } from '../providers/jwt-client/jwt-client';
import {IonicStorageModule, Storage} from "@ionic/storage";
import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";
import { AuthProvider } from '../providers/auth/auth';
import {Env} from "../models/env";
import { DefaultXHRBackend } from '../providers/default-xhr-backend/default-xhr-backend';
import { RedirectProvider } from '../providers/redirect/redirect';

declare var ENV:Env;

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        Test,
        LoginPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp,{},{
            links: [
                {component: LoginPage, name: 'LoginPage', segment: 'login'},
                {component: HomePage, name: 'HomePage', segment: 'home'}
            ]
        }),

        HttpModule,
        IonicStorageModule.forRoot({
            driverOrder: ['localstorage']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        HomePage,
        ListPage,
        Test,
        LoginPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        JwtClient,
        JwtHelper,
        AuthProvider,
        RedirectProvider,
        {provide: AuthHttp, deps: [ Http, Storage],
            useFactory(http, storage){
            let authConfig = new AuthConfig({
                headerPrefix: 'Bearer',
                noJwtError: true,
                noClientCheck: true,
                tokenGetter: (() => storage.get(ENV.TOKEN_NAME)),
            });
            return new AuthHttp(authConfig,http);
        }},
        {provide: XHRBackend, useClass: DefaultXHRBackend},
    RedirectProvider,

    ]
})
export class AppModule {}
