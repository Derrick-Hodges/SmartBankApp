import { Component } from '@angular/core';

import { PaymentPage } from '../payment/payment';
import { PaymentHistoryPage } from '../payment-history/payment-history';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PaymentPage;
  tab3Root = PaymentHistoryPage;

  constructor() {

  }
}
