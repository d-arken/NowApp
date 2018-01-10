import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {NavController} from "ionic-angular";

/*
  Generated class for the RedirectProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RedirectProvider {

    //Event -> algo que acontece.
    //Listener -> sabe que aconteceu -> ação.

  subject = new Subject;

  config(navCtrl: NavController, link = 'LoginPage'){
    this.subject.subscribe(() =>{
      setTimeout(()=>{
          navCtrl.setRoot(link);
      });
    })
  }

  redirect(){
    this.subject.next();
  }
}
