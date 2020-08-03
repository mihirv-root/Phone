import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact details/contact.service';
import { Contact } from '../contact details/contact';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddcontactsComponent } from '../addcontacts/addcontacts.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})


export class PhonebookComponent implements OnInit {
  contacts: Contact[];
  matConfig:MatDialogConfig;
  searchByVal:string;
  sortBySomething:string;
  constructor(private contactsSer : ContactService, private matDialog: MatDialog) {
    this.contacts = contactsSer.getContacts();
    this.matConfig = new MatDialogConfig();
    this.searchByVal;
   }

  ngOnInit(): void {
  }

  openModal(){
    this.matConfig.disableClose = false;
    this.matConfig.id = "add-modal";
    this.matConfig.height = "45%";
    this.matConfig.width = "45%";
    this.matConfig.data = new Contact("", "", "");

    const modalDialog = this.matDialog.open(AddcontactsComponent, this.matConfig).afterClosed().subscribe(() => {
      this.contacts = this.contactsSer.getContacts();
      this.sortBy();
    });
  }

  deleteRecord(contact:Contact){
    for (let idx = 0; idx < this.contacts.length; idx++) {
      if(contact === this.contacts[idx]){
        this.contacts.splice(idx, 1);
      }
    }
  }

  edit(contact: Contact){
    this.matConfig.disableClose = false;
    this.matConfig.id = "add-modal";
    this.matConfig.height = "45%";
    this.matConfig.width = "45%";

    this.matConfig.data = contact;

    this.matDialog.open(EditComponent, this.matConfig).afterClosed().subscribe(() => {
      this.sortBy();
    })
  }

  Search(){
    this.contacts = this.contactsSer.getContacts();
    if(this.searchByVal.length !== 0){
      this.contacts = this.contacts.filter(el => {
        var patternSearch = new RegExp(this.searchByVal.toUpperCase());
        return patternSearch.test((el.fname + el.lname).toUpperCase());
      })
    }
  }

  sortBy(){
    if(this.sortBySomething === "Asc"){
      this.contacts = this.contacts.sort((m1:Contact, m2:Contact) =>{
        if(m1.fname.toUpperCase() < m2.fname.toUpperCase()){
          return -1
        }
        if(m1.fname.toUpperCase() > m2.fname.toUpperCase()){
          return 1
        }
  
        if(m1.fname.toUpperCase() === m2.fname.toUpperCase()){
          return 0
        }
      });  
    }

    if(this.sortBySomething === "Desc"){
      this.contacts = this.contacts.sort((m1:Contact, m2:Contact) =>{
        if(m1.fname.toUpperCase() < m2.fname.toUpperCase()){
          return 1
        }
        if(m1.fname.toUpperCase() > m2.fname.toUpperCase()){
          return -1
        }
        if(m1.fname.toUpperCase() === m2.fname.toUpperCase()){
          return 0
        }
      });
    }
  }
}
