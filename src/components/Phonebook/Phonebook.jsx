import React, { useState, useEffect } from 'react';
import { Form } from 'components/Form/Form';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';

export const Phonebook = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    return parsedContacts.length > 0 ? parsedContacts : initialContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formHandler = (newName, newNumber) => {
    let isAdded = false;

    contacts.filter(contact => {
      if (newName.toLowerCase() === contact.name.toLowerCase()) {
        alert(`${newName} is already in contacts!`);
        isAdded = true;
        return contact.name;
      }
      return;
    });
    if (isAdded !== true) {
      setContacts([
        ...contacts,
        { id: nanoid(5), name: newName, number: newNumber },
      ]);
    }
  };

  const onChange = event => {
    setFilter(event.currentTarget.value);

    filterHandler();
  };

  const filterHandler = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={formHandler} />
      <Filter filter={filter} handleChange={onChange} />
      <h2>Contacts</h2>

      {filter === '' ? (
        <ContactList data={contacts} deleteContact={deleteContact} />
      ) : (
        <ContactList data={filterHandler()} deleteContact={deleteContact} />
      )}
    </div>
  );
};
