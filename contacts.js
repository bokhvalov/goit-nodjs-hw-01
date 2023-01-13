const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const listOfContacts = await fs.readFile(contactsPath, "UTF-8");
  return JSON.parse(listOfContacts);
}

async function getContactById(contactId) {
  const listOfContacts = await fs.readFile(contactsPath, "UTF-8");
  const parsedContacts = JSON.parse(listOfContacts);
  const contact = parsedContacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const listOfContacts = await fs.readFile(contactsPath, "UTF-8");
  const parsedContacts = JSON.parse(listOfContacts);
  const filteredContacts = parsedContacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
}

async function addContact(name, email, phone) {
  const listOfContacts = await fs.readFile(contactsPath, "UTF-8");
  const parsedContacts = JSON.parse(listOfContacts);

  //looking for the biggest id number (could be replaced by some id generator)
  let biggestId = 0;
  parsedContacts.map(({ id }) => (+id > biggestId ? (biggestId = +id) : null));

  parsedContacts.push({
    id: (biggestId + 1).toString(), //converting to String to save DB var's type from example
    name: name.toString(),
    email: email.toString(),
    phone: phone.toString(),
  });

  fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
