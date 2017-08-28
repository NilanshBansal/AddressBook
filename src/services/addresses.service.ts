
import { Address } from "./addresses.model";


export class AddressService {
  private Addresses:Address[]=[];
  public itemToEdit;

  getAddresses(){
    return this.Addresses;
  }
//to find item from allAddresses array so as to delete or edit
  checkdublicate(item):number{
    for (var i=0;i<this.Addresses.length;i++)
    {
      if(this.Addresses[i].email==item.email)
        return i;
    }
    return -1;
  }

  addToAddresses(item){

    this.Addresses.push(item);
  }

  removeFromAddresses(item){
    var index=this.checkdublicate(item);
    this.Addresses.splice(index,1);
  }

  editAddress(item){
    var index=this.checkdublicate(this.itemToEdit);
    this.Addresses[index].name=item.name;
    this.Addresses[index].email=item.email;
    this.Addresses[index].contact=item.contact;
    this.Addresses[index].calendar=item.calendar;
    this.Addresses[index].dateofbirth=item.dateofbirth;

  }

}
