import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Test } from './test';

@NgModule({
  declarations: [
    Test,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    Test
  ]
})
export class TestModule {}
