import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancePage } from './balance';

@NgModule({
  declarations: [
    BalancePage,
  ],
  imports: [
    IonicPageModule.forChild(BalancePage),
  ],
})
export class BalancePageModule {}
