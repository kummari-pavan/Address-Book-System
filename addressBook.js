class ContactDetails{
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    displayContact() {
        return `
        1.Name:- ${this.firstName} ${this.lastName}
        2.Address:- ${this.address}, ${this.city}, ${this.state}, ${this.zip}
        3.Phone:- ${this.phoneNumber}
        4.Email:- ${this.email}
        `;
    }
}

let ContactDetails1 = new ContactDetails( "Pavan", "Vemulapati", "123 Main St", "Bangalore", "karnataka", "516330", "9597878654", "kpavan@example.com");

console.log(ContactDetails1.displayContact());
