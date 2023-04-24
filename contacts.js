const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
  
const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        console.table(JSON.parse(data));
    } catch (error) {
        console.log(error);
    }
};

const getContactById = async contactId => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8")
        const contact = JSON.parse(data)
        console.table(contact.filter(e => e.id === contactId));
    } catch (error) {
        console.log(error)
    }
};

const removeContact = async contactId => {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const filterContacts = JSON.parse(data).filter(e => e.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(filterContacts))
        console.log('Contact successfully deleted')
    } catch (error) {
        console.log(error)
    }
};

const addContact = async (name, email, phone) => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const newContact = {
            id: uuidv4(),
            name,
            email,
            phone,
        };

        const emailExist = contacts.some(e => e.email === email);

        if (!emailExist) {
            contacts.push(newContact);
            await fs.writeFile(contactsPath, JSON.stringify(contacts));
            console.log('Contact added')
        } else {
            console.log('Contact already exist')
        }

        // data.push(newContact);
        // await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
        // return newContact
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};