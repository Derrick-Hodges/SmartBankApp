import {Injectable} from '@angular/core';
import {Paho} from 'ng2-mqtt/mqttws31';
import { Observable } from 'rxjs/Observable';

//import 'rxjs/Rx';

@Injectable()
export class MqttProvider {


  public static readonly IMEI = "256750061998684";
  public static readonly ACCOUNT = "24779203";
  public static readonly CUSTID = "30297742";
  public static readonly USERNAME = "smartbank";
  public static readonly PASSWORD = "password";
  public static readonly VMRIP = "192.168.0.30";
  public static readonly VMRPORT = 1909;
  private client : any;
  private onConnectLost ; any;
  public lastBalMsg: Paho.MQTT.Message;
  public lastPayMsg: Paho.MQTT.Message;
  public paymentObserver: Observable<any>;
  public balanceObserver: any;
  private vmrProp = {userName:MqttProvider.USERNAME, password:MqttProvider.PASSWORD,onSuccess:this.onConnected.bind(this),onFailure:this.onFailed.bind(this)};

  constructor() {
  //  this.paymentObserver = Observable.create(observer => {this.onMessageArrived(observer)});
  //  console.log("payment observerable in mqtt: " + this.paymentObserver);
//  this.onMessageArrived().subscribe(data => {console.log("this is the Subscription in mqtt: "+ data)});
  }

  conn() {
  console.log("in the connect method");
  this.client = new Paho.MQTT.Client(MqttProvider.VMRIP, MqttProvider.VMRPORT, MqttProvider.IMEI);
  this.client.onConnectionLost = this.onConnectionLost;
  this.client.onMessageArrived = this.onMessageArrived;
  this.client.connect(this.vmrProp);

}

  onConnected(responseObject) {
    console.log("Connected to the broker:  " + JSON.stringify(this.vmrProp));
    //this.client.subscribe("Balance/"+ MqttProvider.IMEI + "/"+ MqttProvider.ACCOUNT);

    this.client.subscribe("Balance/256750061998684/24779203");
    setTimeout(this.sendMessage("38005.18"), 2000);

  }

  onFailed(responseObject){
    console.log("in the onFailed method");
    console.log('Connection failed : ' + JSON.stringify(responseObject));
  }

  sendMessage(message: string) {
    let packet = new Paho.MQTT.Message(message);
    packet.destinationName = "Payment/"+ MqttProvider.IMEI + "/"+ MqttProvider.ACCOUNT + "/payment/123";
    console.log("packet destination: "+ packet.destinationName);
    console.log("packet: "+ JSON.stringify(packet));
    this.client.send(packet);
  }

  onMessageArrived() : Observable <any> {
    this.client.onMessageArrived = (message: Paho.MQTT.Message) =>{
      console.log ("Message arrived: " + message.payloadString);
    }
      return Observable.create(observer =>
        {this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
           observer.next(message)}}
        )
    }

//    this.onMessage = observer.payloadString;
//    this.observer.next(true);}
  //  (message: Paho.MQTT.Message) => {
  //    console.log('Message arrived : ' + this.client.message.payloadString);

    //  }


  onConnectionLost(responseObject) {
    this.onConnectLost = (responseObject: Object) => {
      console.log('Connection lost : ' + JSON.stringify(responseObject));
    };
  }
}
