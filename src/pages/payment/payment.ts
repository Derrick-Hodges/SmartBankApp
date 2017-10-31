import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {MqttProvider} from '../../providers/mqtt/mqtt';
import {PaymentMessage} from '../../providers/messages/paymentMessage'

//import {Subscription}  from 'rxjs/Subscription';
//import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  private balanceValue = "35.08";
  private accountValue = "";
  private payeeValue ="";
  private amountValue= "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private mqttProvider : MqttProvider, private paymentMessage: PaymentMessage) {
    this.mqttProvider.conn();
    console.log("about to call subscribe");
    console.log("this is the observer in payment: " +JSON.stringify(this.mqttProvider.onMessageArrived()));
    this.mqttProvider.onMessageArrived().subscribe(data => {this.balanceValue = data.payloadString; console.log("this is the Subscription: "+ data.payloadString);});
  }
  submitPayment(event: Event){
    event.stopPropagation();
    this.showAlert();
    this.paymentMessage.account= this.accountValue;
    this.paymentMessage.amount = this.amountValue;
    this.paymentMessage.payee = this.payeeValue;
    this.accountValue = "";
    this.payeeValue = "";
    this.amountValue ="";
    console.log("Button Pressed Payment Message :" +JSON.stringify(this.paymentMessage));
    this.mqttProvider.sendMessage (JSON.stringify(this.paymentMessage));
 }
 showAlert(){
    let alert = this.alertCtrl.create ({
    title: 'Payment Submitted',
    subTitle: 'Your Payment is Submitted Navigate to Payment History page for Status Information',
    buttons: ['OK']
   });
   alert.present();
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
