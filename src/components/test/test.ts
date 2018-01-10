import { Component } from '@angular/core';
import {NavParams} from "ionic-angular";

/**
 * Generated class for the Test component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'test',
  templateUrl: 'test.html'
})
export class Test {

  text: string;

  constructor(public navParams: NavParams) {
    console.log('Hello Test Component');
    this.text = 'Hello World'+this.navParams.get('name');

  }

}



