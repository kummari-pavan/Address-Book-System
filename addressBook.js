
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
        4.Email: ${this.email} `;
    }
    
    
}

// Creating stack for adding Address Book details
class AddressBook {
    constructor() {
        this.contacts = []; 
    }

    // addContact(contact) {
    //     this.contacts.push(contact); 
    // }

    addContact(newContact) {

        const duplicateContacts = this.contacts.filter(contact => 
            contact.firstName === newContact.firstName && contact.lastName === newContact.lastName
        );

        if (duplicateContacts.length === 0) {
            this.contacts.push(newContact);
            console.log(`Contact ${newContact.firstName} ${newContact.lastName} added successfully.`);
        } else {
            console.log(`Duplicate entry! Contact ${newContact.firstName} ${newContact.lastName} already exists.`);
        }
    }

    findContactByName(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    editContactByName(firstName, lastName, newContactDetails) {
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            contact.editContact(
                newContactDetails.firstName,
                newContactDetails.lastName,
                newContactDetails.address,
                newContactDetails.city,
                newContactDetails.state,
                newContactDetails.zip,
                newContactDetails.phoneNumber,
                newContactDetails.email
            );
            console.log("Contact updated successfully.");
        } else {
            console.log("Contact not found.");
        }
    }
    //Delete Method using name
    deleteContactByName(firstName, lastName) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => !(contact.firstName === firstName && contact.lastName === lastName));
        
        if (this.contacts.length < initialLength) {
            console.log(`Contact ${firstName} ${lastName} deleted successfully.`);
        } else {
            console.log(`Contact ${firstName} ${lastName} not found.`);
        }
    }

    findNumberOfContacts() {
        const c = this.contacts.reduce((count) => count + 1, 0);
        console.log(`Number of contacts: ${c}`);
        return c;
    }
  
    //search contacts USING city
    searchWithCity(city) {
        const contactsInCity = this.contacts.filter(contact => contact.city === city);
        if (contactsInCity.length > 0) {
            console.log(`Contacts in ${city}:`);
            contactsInCity.forEach(contact => {
                console.log(`${contact.firstName} ${contact.lastName}`);
            });
        } else {
            console.log(`No contacts found in ${city}.`);
        }
    }

    //search contacts USING state
    searchWITHState(state) {
        const contactsInState = this.contacts.filter(contact => contact.state === state);
        if (contactsInState.length > 0) {
            console.log(`Contacts in ${state}:`);
            contactsInState.forEach(contact => {
                console.log(`${contact.firstName} ${contact.lastName}`);
            });
        } else {
            console.log(`No contacts found in ${state}.`);
        }
    }

     //view persons by a specific city
     viewPersonsByCity(city) {
        const filteredContacts = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());

        if (filteredContacts.length > 0) {
            console.log(`Persons in City: ${city}`);
            filteredContacts.forEach(contact => {
                console.log(`- ${contact.firstName} ${contact.lastName}, Address: ${contact.address}, Zip: ${contact.zip}, Phone: ${contact.phone}, Email: ${contact.email}`);
            });
        } else {
            console.log(`No contacts found in City: ${city}`);
        }
    }

    // view persons by a specific state
    viewPersonsByState(state) {
        const filteredContacts = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());

        if (filteredContacts.length > 0) {
            console.log(`Persons in State: ${state}`);
            filteredContacts.forEach(contact => {
                console.log(`- ${contact.firstName} ${contact.lastName}, Address: ${contact.address}, Zip: ${contact.zip}, Phone: ${contact.phone}, Email: ${contact.email}`);
            });
        } else {
            console.log(`No contacts found in State: ${state}`);
        }
    }
    
    //Count No.of Persons Contacts by City
    countContactsByCity() {
        let cityCount = {};
        
        for (let i = 0; i < this.contacts.length; i++) {
            let city = this.contacts[i].city;
            if (cityCount[city]) {
                cityCount[city]++;
            } else {
                cityCount[city] = 1;
            }
        }

        console.log("Contact Count by City:");
        for (let city in cityCount) {
            console.log(city + ": " + cityCount[city]);
        }
    }

    //Count No.of Persons Contacts by State
    countContactsByState() {
        let stateCount = {};
        for (let i = 0; i < this.contacts.length; i++) {
            let state = this.contacts[i].state;
            if (stateCount[state]) {
                stateCount[state]++;
            } else {
                stateCount[state] = 1;
            }
        }

        console.log("Contact Count by State:");
        for (let state in stateCount) {
            console.log(state + ": " + stateCount[state]);
        }
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
    let ContactDetails3 = new ContactDetails( "Charan", "Vemulapati", "123 Main St", "Bangalore", "karnataka", "516330", "9597878654", "charan@example.com");

    console.log(ContactDetails1.displayContact());
    console.log(ContactDetails2.displayContact());

    addressBook.addContact(ContactDetails1); 
    addressBook.addContact(ContactDetails2); 

    addressBook.addContact(ContactDetails3);

    // Display all contacts in the Address Book
    console.log(addressBook.displayAllContacts());


    //Now im Editing The Details
    const updatedingDetails = {
        firstName: "Pavan",
        lastName: "k",
        address: "123 Main St",
        city: "Bangalore",
        state: "karnataka",
        zip: "516330",
        phoneNumber: "9597878654",
        email: "kpavan@example.com"
    };
    //Giving arguments To editContactByName method
    addressBook.editContactByName("Pavan", "k", updatedingDetails);
    //delete
    addressBook.deleteContactByName("Pavan","k");
    //findNumberOfContacts
    addressBook.findNumberOfContacts()

    addressBook.searchWithCity("Bangalore");
    addressBook.searchWITHState("Karnataka");

    addressBook.viewPersonsByCity("Bangalore");  
    addressBook.viewPersonsByState("Karnakata");

    addressBook.countContactsByCity();
    addressBook.countContactsByState();

    console.log(addressBook.displayAllContacts());

} 
catch (error) {
    console.error(error.message);
}