
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

// Creating AddressBook for adding Address Book and Conatact details
class AddressBook {
    constructor() {
        this.contacts = []; //This is for storing Contact Details in array
        this.addressBooks = {}; // This is for storing Conatct Details in Object
    }

    // addContact(contact) {
    //     this.contacts.push(contact); 
    // }

    // Create a new address book to Object
    createAddressBook(bookName) {
        if (this.addressBooks[bookName]) {
            console.log(`Address Book '${bookName}' already exists.`);
        } else {
            this.addressBooks[bookName] = [];
            console.log(`Address Book '${bookName}' created successfully!`);
        }
    }
    
    //adding conatcts to array
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
    //Here i am adding contacts to contacts Book
    addContactToBook(bookName, contacts) {
        if (this.addressBooks[bookName]) {
            if (!this.isDuplicateContact(bookName, contacts.firstName, contacts.lastName)) {
                this.addressBooks[bookName].push(contacts);
                console.log(`Contact '${contacts.firstName} ${contacts.lastName}' added to '${bookName}' successfully!`);
            } else {
                console.log(`Duplicate entry: Contact '${contacts.firstName} ${contacts.lastName}' already exists in '${bookName}'.`);
            }
        } else {
            console.error(`Address Book '${bookName}' does not exist.`);
        }
    }

    //finding contact details in contact details array using name
    findContactByName(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }
    //editing
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
    
     // Count the total number of contacts in book
     countContacts(bookName) {
        if (this.addressBooks[bookName]) {
            const totalContacts = this.addressBooks[bookName].reduce((count, contact) => count + 1, 0);
            console.log(`Total contacts in '${bookName}': ${totalContacts}`);
            return totalContacts;
        } else {
            console.error(`Address Book '${bookName}' does not exist.`);
            return 0;
        }
    }
  
    //search contacts USING city
    searchWithCity(bookName,city) {
        if (this.addressBooks[bookName]) {
            const contactsInCity = this.addressBooks[bookName].filter(contact => contact.city.toLowerCase() === city.toLowerCase());
            console.log(`Contacts in city '${city}':`);
            contactsInCity.forEach(contact => contact.displayContact());
            return contactsInCity;
        } else {
            console.error(`Address Book '${bookName}' does not exist.`);
            return [];
        }
    }

    //search contacts USING state in object book
    searchWITHState(bookName,state) {
        if (this.addressBooks[bookName]) {
            const contactsInState = this.addressBooks[bookName].filter(contact => contact.state.toLowerCase() === state.toLowerCase());
            console.log(`Contacts in state '${state}':`);
            contactsInState.forEach(contact => contact.displayContact());
            return contactsInState;
        } else {
            console.error(`Address Book '${bookName}' does not exist.`);
            return [];
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
    countContactsByCity(bookName, city) {
        if (this.addressBooks[bookName]) {
            const count = this.addressBooks[bookName]
                .filter(contact => contact.city.toLowerCase() === city.toLowerCase())
                .reduce((total, contact) => total + 1, 0);
                
            console.log(`Total contacts in city '${city}': ${count}`);
            return count;
        } else {
            console.error(`Address Book '${bookName}' does not exist.`);
            return 0;
        }
    }

    //Count No.of Persons Contacts by State
    countContactsByState(bookName, state) {
            if (this.addressBooks[bookName]) {
                const count = this.addressBooks[bookName]
                    .filter(contact => contact.state.toLowerCase() === state.toLowerCase())
                    .reduce((total, contact) => total + 1, 0);
                    
                console.log(`Total contacts in state '${state}': ${count}`);
                return count;
            } else {
                console.error(`Address Book '${bookName}' does not exist.`);
                return 0;
            }
    }
    
    
   // Sort contacts by name (first name, then last name)
   sortContactsByName(bookName) {
        if (this.addressBooks[bookName]) {
            this.addressBooks[bookName].sort((a, b) => {
                const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
            console.log(`Contacts in '${bookName}' sorted by name:`);
            this.displayContactsFromBook(bookName);
        } else {
            console.error(`Address Book '${bookName}' does not exist.`);
        }
    }

    //This is For Use Case - 12 Sort contacts by city, state, or zip
    sortContactsByCriterion(bookName, criterion) {
        if (this.addressBooks[bookName]) {
            this.addressBooks[bookName].sort((a, b) => {
                if (criterion === 'city') {
                    return a.city.localeCompare(b.city);
                } else if (criterion === 'state') {
                    return a.state.localeCompare(b.state);
                } else if (criterion === 'zip') {
                    return a.zip.localeCompare(b.zip);
                } else {
                    console.error("Invalid sorting criterion. Use 'city', 'state', or 'zip'.");
                    return 0; 
                }
            });
            console.log(`Contacts in '${bookName}' sorted by ${criterion}:`);
            this.displayContactsFromBook(bookName);
        } else {
            console.error(`Address Book '${bookName}' does not exist.`);
        }
    }

   //Displaying all Objects Presented in Book
    displayAllContacts() {
        if (this.contacts.length === 0) {
            return "No contacts found in the Address Book.";
        }
        return this.contacts.map(contact =>
             contact.displayContact()).join("\n");
            
    }

     // list all available address books
     listAddressBooks() {
        const bookNames = Object.keys(this.addressBooks);
        if (bookNames.length === 0) {
            console.log("No address books available.");
        } else {
            console.log("Available Address Books:");
            bookNames.forEach(bookName => console.log(bookName));
        }
    }
}

let addressBook = new AddressBook();
addressBook.createAddressBook("Person-Book-1");

try {
    

    let ContactDetails1 = new ContactDetails( "Pavan", "Vemulapati", "123 Main St", "Bangalore", "karnataka", "516330", "9597878654", "kpavan@example.com");
    let ContactDetails2 = new ContactDetails( "Charan", "Vemulapati", "123 Main St", "Bangalore", "karnataka", "516330", "9597878654", "charan@example.com");
    let ContactDetails3 = new ContactDetails( "Charan", "Vemulapati", "123 Main St", "Bangalore", "karnataka", "516330", "9597878654", "charan@example.com");

    console.log(ContactDetails1.displayContact());
    console.log(ContactDetails2.displayContact());

    addressBook.addContact(ContactDetails1); 
    addressBook.addContact(ContactDetails2); 
    addressBook.addContact(ContactDetails3);

    addressBook.addContactToBook("Person-Book-1", ContactDetails1);
    addressBook.addContactToBook("Person-Book-1", ContactDetails2);
    addressBook.addContactToBook("Person-Book-1", ContactDetails3);

    // Display all contacts in the Address Book
    console.log(addressBook.displayAllContacts());
    addressBook.listAddressBooks();


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
    addressBook.countContacts("Person-Book-1");

    addressBook.searchWithCity("Person-Book-1","Bangalore");
    addressBook.searchWITHState("Person-Book-1","Karnataka");

    addressBook.viewPersonsByCity("Bangalore");  
    addressBook.viewPersonsByState("Karnakata");

    addressBook.countContactsByCity("Person-Book-1","Bangalore");
    addressBook.countContactsByState("Person-Book-1","Karnakata");

    console.log(addressBook.displayAllContacts());

} 
catch (error) {
    console.error(error.message);
}


// Sort and display contacts by name
addressBook.sortContactsByName("Person-Book-1");

// Sort and display contacts by city
addressBookManager.sortContactsByCriterion("Person-Book-1", "city");

// Sort and display contacts by state
addressBookManager.sortContactsByCriterion("Person-Book-1", "state");

// Sort and display contacts by zip
addressBookManager.sortContactsByCriterion("Person-Book-1", "zip");