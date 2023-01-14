const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const listOfContacts = await fs.readFile(contactsPath, "UTF-8");
  return JSON.parse(listOfContacts);
}



async function getContactById(contactId) {
  const parsedContacts = await listContacts();

  const contact = parsedContacts.find((contact) => contact.id === contactId);
  return contact;
}



async function removeContact(contactId) {
  const parsedContacts = await listContacts();

  const filteredContacts = parsedContacts.filter(
    ({id}) => id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

  console.log(`Contact with id #${contactId} successfully deleted, the db updated`);
  return await listContacts();
}



async function addContact(name, email, phone) {
  const parsedContacts = await listContacts();

  //looking for the biggest id number (could be replaced by some id generator)
  let biggestId = 0;
  parsedContacts.map(({ id }) => (+id > biggestId ? (biggestId = +id) : null));
  const newContactID = biggestId + 1;

  parsedContacts.push({
    id: newContactID.toString(), //converting to String to save DB var's types from example
    name: name.toString(),
    email: email.toString(),
    phone: phone.toString(),
  });
  fs.writeFile(contactsPath, JSON.stringify(parsedContacts));

  console.log(`${name} successfully added to DB with id ${newContactID}`)
  return await listContacts();
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
