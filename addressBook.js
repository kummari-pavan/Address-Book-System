
class ContactDetails{
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {

        this.firstName = this.validateName(firstName, "First Name");
        this.lastName  = this.validateName(lastName, "Last Name");
        this.address   = this.validateAddressCityState(address, "Address");
        this.city      = this.validateAddressCityState(city, "City");
        this.state     = this.validateAddressCityState(state, "State");
        this.zip       = this.validateZip(zip);
        this.phoneNumber = this.validatePhone(phoneNumber);
        this.email     = this.validateEmail(email);
    }
 
    //validate name,According to the Requirment first and last Starts with capital letter, min 3 chars
    validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`Hey !! Check ${fieldName} should start with a capital letter and have at least 3 characters.`);
        }
        return name;
    }

    //validate address,According to the Requirment, city, and state - Min 4 chars
    validateAddressCityState(value, fieldName) {
        if (value.length < 4) {
            throw new Error(`Hey !! Check ${fieldName} should have at least 4 characters.`);
        }
        return value;
    }

    //validate zip According to the Requirment - 5 digits for use appropriate pattern
    validateZip(zip) {
        const zipRegex = /^[0-9]{5,}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Hey !! Check Zip code should have at least 5 digits.");
        }
        return zip;
    }

    //validate phone numberAccording to the Requirment - 10 digits
    validatePhone(phoneNumber) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            throw new Error("Hey !! Check Phone number should be a 10-digit number.");
        }
        return phoneNumber;
    }

    //validate email
    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Hey !! Check Invalid email address format.");
        }
        return email;
    }

    displayContact() {
        return `
        1.Name: ${this.firstName} ${this.lastName}
        2.Address: ${this.address}, ${this.city}, ${this.state}, ${this.zip}
        3.Phone: ${this.phoneNumber}
        4.Email: ${this.email}`;
    }
    
}

// Creating stack for adding Address Book details
class AddressBook {
    constructor() {
        this.contacts = []; 
    }

    addContact(contact) {
        this.contacts.push(contact); 
    }

    displayAllContacts() {
        if (this.contacts.length === 0) {
            return "No contacts found in the Address Book.";
        }
        return this.contacts.map(contact =>
            contact.displayContact()).join("\n");
            
    }
}

try {
    let addressBook = new AddressBook();

    let ContactDetails1 = new ContactDetails( "Pavan", "Vemulapati", "123 Main St", "Bangalore", "karnataka", "516330", "9597878654", "kpavan@example.com");
    let ContactDetails2 = new ContactDetails( "Charan", "Vemulapati", "123 Main St", "Bangalore", "karnataka", "516330", "9597878654", "charan@example.com");
    console.log(ContactDetails1.displayContact());
    console.log(ContactDetails2.displayContact());

    addressBook.addContact(ContactDetails1); 
    addressBook.addContact(ContactDetails2); 

    // Display all contacts in the Address Book
    console.log(addressBook.displayAllContacts());
} 
catch (error) {
    console.error(error.message);
}



