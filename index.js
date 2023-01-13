const {listContacts,
    getContactById,
    removeContact,
    addContact} = require ('./contacts');


   const a = async() => {
         console.log (await listContacts())
   }
   a()