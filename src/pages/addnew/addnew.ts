import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressService } from "../../services/addresses.service";
import { Address } from "../../services/addresses.model";
import { AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-addnew',
  templateUrl: 'addnew.html',
})
export class AddnewPage {

  public isChecked: boolean = false;

  newAddress:Address={
    name:"",
    email:"",
    contact:"",
    calendar:"",
    dateofbirth:""

  };

  constructor(public navCtrl: NavController, public navParams: NavParams,private addressService:AddressService,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewPage');
  }

  onAddingNewAddress(value){
    if(this.addressService.checkdublicate(value)!==-1)
      {
        this.showUserExistsAlert();
        return;
      }
    this.showContactAddedSuccessAlert();
    this.addressService.addToAddresses(value);
    this.navCtrl.push(HomePage);
  }

  goToHome(){
    this.navCtrl.popToRoot(HomePage); //so that all pages are removed and only root left so no back button
  //  this.navCtrl.push(HomePage);

  }
  //function to check valid email entered and display error message
  emailvalidation(value){
    var len=value.length;
    var flag1=0;
    var flag2=0;
    var i;
    if(value[0]=="." || value[0]=="@" || value[len-1]=="@" || value[len-1]==".")
      {
          this.showIncorrectEmailAlert();
          return;
      }
    for(i=1;i<len-1;i++)
      {
        if(value[i]=="@")
          {
            flag1=i;
            break;

          }
      }
      if(flag1==0)
      {
        this.showIncorrectEmailAlert();
        return;
      }
    for(i=1;i<len-1;i++)
      {
        if(value[i]==".")
          {flag2=i;
          break;}
      }
      if(flag2==0 || flag1>flag2 || flag2==flag1+1)
      {
        this.showIncorrectEmailAlert();
        return;
      }
      for(i=flag1+1;i<len-1;i++)
      {
        if(value[i]=="@")
        {
          this.showIncorrectEmailAlert();
          return;
        }
      }
      for(i=flag2+1;i<len-1;i++)
      {
        if(value[i]==".")
        {
          this.showIncorrectEmailAlert();
          return;
        }
      }
  }

  showUserExistsAlert() {
    let alert = this.alertCtrl.create({
      title: 'User Already Exists',
      subTitle: 'Contact Not Added',
      buttons: ['OK']
    });
    alert.present();
  }

  showContactAddedSuccessAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Contact Added ',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

  showIncorrectEmailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Incorrect Email Type',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
    this.newAddress.email = "";

  }

  checkStatus(e){

    this.isChecked=!this.isChecked;
  }

}
