import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentHistoryPage } from './payment-history';

@NgModule({
  declarations: [
    PaymentHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentHistoryPage),
  ],
})
export class PaymentHistoryPageModule {}
