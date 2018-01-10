import
{ Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Test} from "../../components/test/test";
import {Auth} from "../../decorators/auth.decorator";
import {AuthHttp} from "angular2-jwt";
import 'rxjs/add/operator/toPromise';

@Auth()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authHttp: AuthHttp) {

  }


  ionViewDidLoad(){


    setInterval(()=>{
        this.authHttp.get('http://pecegenow.test/api/user').toPromise().then(()=>{
            console.log("1")
        });
        this.authHttp.get('http://pecegenow.test/api/user').toPromise().then(()=>{
            console.log("2")
        });
        this.authHttp.get('http://pecegenow.test/api/user').toPromise().then(()=>{
            console.log("3")
        });
    },60*1000+1)

  }
}
