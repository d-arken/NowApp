import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, ToastController} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import {AuthProvider} from "../../providers/auth/auth";
import {HomePage} from "../home/home"


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    user = {
        email: '',
        password: '',
    }


    constructor(public navCtrl: NavController, public menuCtrl: MenuController, public toastCtrl: ToastController, public navParams: NavParams, private auth: AuthProvider) {
        this.menuCtrl.enable(false);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(){
        this.auth.login(this.user)
            .then(()=>{
            this.afterLogin();
        }).catch(() => {
            let toast = this.toastCtrl.create({
                message: 'As informações de login não foram encontradas',
                duration: 2000,
                position: 'bottom',

            })
            toast.present();
        });
    }

    logout(){
        this.auth.logout().then(()=>{
            console.log('logged out');
        });
    }

    afterLogin(){
        this.menuCtrl.enable(true);
        this.navCtrl.push(HomePage);
    }



}
