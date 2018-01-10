import { Injectable } from '@angular/core';
import {
    BrowserXhr, Request, Response, XHRConnection, ResponseOptions, XHRBackend, XSRFStrategy,

} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {appContainer} from "../../app/app.container";
import {JwtClient} from "../jwt-client/jwt-client";
import {Observable} from "rxjs/Observable";
import {RedirectProvider} from "../redirect/redirect";

@Injectable()
export class DefaultXHRBackend extends XHRBackend{

    constructor(browserXHR: BrowserXhr,
                baseResponseOptions: ResponseOptions,
                xsrfStrategy: XSRFStrategy) {
        super(browserXHR, baseResponseOptions, xsrfStrategy);

    }


    createConnection(request: Request): XHRConnection {
        let xhrConnection = super.createConnection(request);
        xhrConnection.response = xhrConnection.response
            .map((response)=>{
                this.tokenSetter(response);
                return response;
            }).catch(error=>{
              this.unauthenticated(error);
              return Observable.throw(error);

            });

        return xhrConnection;
    }


    tokenSetter(response: Response){
        let jwtClient = appContainer().get(JwtClient);
        if(response.headers.has('Authorization')){
            let authorization = response.headers.get('Authorization');
            let token = authorization.replace('Bearer ','');
            jwtClient.setToken(token);
        }
    }

    unauthenticated(error: Response){
        let redirect = appContainer().get(RedirectProvider);
        if(error.status===401){
            redirect.redirect();
        }
    }
}
