import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddnewPage } from "../addnew/addnew";
import { AddressService } from "../../services/addresses.service";
import { Address } from "../../services/addresses.model";
import { AlertController } from 'ionic-angular';
import { EditPage } from "../edit/edit";
import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allAddresses: Address[] =[];
  loadedAddresses:Address[] =[];

  constructor(public navCtrl: NavController,private addressService:AddressService,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController) {

  }

  ionViewWillEnter(){

    this.allAddresses=this.addressService.getAddresses();
    this.loadedAddresses=this.addressService.getAddresses();
    if(this.allAddresses.length==0)
    {
      this.showAlert();
    }

  }

  onAddNew(){
    this.navCtrl.push(AddnewPage);
  }

  onRemoveAddress(item){
     var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    

    this.addressService.removeFromAddresses(item);

    if(this.addressService.getAddresses().length==0)
    {
      this.showAlert();
    }

  }

  onEdit(item){
    
     var e = window.event;   //done so that on button click the menu (action sheet) also does not display from parent div
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    
    this.addressService.itemToEdit=item;

    this.navCtrl.push(EditPage);

  }

  initializeItems(): void {
  this.allAddresses = this.loadedAddresses;
}


  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'No Contacts',
        subTitle: 'Please add some contacts',
        buttons: ['OK']
      });
      alert.present();
    }

   presentActionSheet(item) {
     

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log('Edit clicked');
            this.addressService.itemToEdit=item;

            this.navCtrl.push(EditPage);
          }
        },{
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            this.addressService.removeFromAddresses(item);

            if(this.addressService.getAddresses().length==0)
              {
                this.showAlert();
              }
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getItems(searchbar) {
   // Reset items back to all of the items
  this.initializeItems();


  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;
  

  // if the value is an empty string don't filter the items
  if (!q) {

    return;
  }

  this.allAddresses = this.allAddresses.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  console.log(q, this.allAddresses.length);

}


}




