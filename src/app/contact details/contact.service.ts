import { Contact } from './contact';

export class ContactService{
    contacts: Contact[];
    constructor(){
        this.contacts = [];

        var contact1 = new Contact("Veeru", "Narayan", "212-211-4686");
        this.contacts.push(contact1);
        var contact2 = new Contact("Suresh", "Prasad", "789456");
        this.contacts.push(contact2);
        var contact3 = new Contact("Ramesh", "Vardhan", "564767464");
        this.contacts.push(contact3);
        var contact4 = new Contact("Mukesh", "Singh", "90809798");
        this.contacts.push(contact4);
    }

    getContacts():Contact[]{
        return this.contacts;
    }

    addContact(contact : Contact){
        this.contacts.push(contact);
    }
}