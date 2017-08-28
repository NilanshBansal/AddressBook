import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressService } from "../../services/addresses.service";
import { Address } from "../../services/addresses.model";
import { HomePage } from "../home/home";
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  allAddresses: Address[] =[];
  public editedItem={};


  constructor(public navCtrl: NavController, public navParams: NavParams,private addressService:AddressService,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  ionViewWillEnter(){

    this.allAddresses=this.addressService.getAddresses();
    this.editedItem=this.addressService.itemToEdit;


  }



  cancelEdit(){

    this.navCtrl.popToRoot(HomePage); //so that all pages are removed and only root left so no back button
    //this.navCtrl.push(HomePage);
    return;
  }

  onEditSave(nameLabel,emailLabel,contactLabel,calendarLabel,dateofbirthLabel){

    if(nameLabel.value==""||emailLabel.value==""||calendarLabel.value==""||dateofbirthLabel.value=="")
      { this.showNecessaryFieldAlert();
        return;
      }
      this.showContactAddedSuccessAlert();
      this.addressService.editAddress({name:nameLabel.value,email:emailLabel.value,contact:contactLabel.value,calendar:calendarLabel.value,dateofbirth:dateofbirthLabel.value});

      this.navCtrl.popToRoot(HomePage); //so that all pages are removed and only root left so no back button
    //  this.navCtrl.push(HomePage);

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

  showNecessaryFieldAlert() {
    let alert = this.alertCtrl.create({
      title: 'Necessary field Needed',
      subTitle: 'Please enter data',
      buttons: ['OK']
    });
    alert.present();
  }

  showContactAddedSuccessAlert() {
    let alert = this.alertCtrl.create({
      title: 'Contact Edited Succesfully',
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
    this.editedItem["email"] ="";

  }

}
