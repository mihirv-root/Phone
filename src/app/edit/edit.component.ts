import { Component, OnInit} from '@angular/core';
import { Contact } from '../contact details/contact';
import { ContactService } from '../contact details/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  contact:Contact;
  contacts:Contact[];
  constructor (private contactSer: ContactService, private matDialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contact = new Contact("", "","");
    this.contacts = this.contactSer.getContacts();
   }

  ngOnInit(): void {
  }

  onAdd(fname:string, lname:string, phoneno:string){

    for(var item of this.contacts){
      if(item === this.data){
        item = this.data;
        item.fname = fname;
        item.lname = lname;
        item.phoneno = phoneno;
      }
    }
    this.matDialogRef.close();
  }
  close()
  {
    this.matDialogRef.close();
  }

}

