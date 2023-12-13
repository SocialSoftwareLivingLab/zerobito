// src/ContactList.js

import React from 'react';

const ContactList = () => {
  const contacts = [
    {
      name: 'Ministério Público',
      phoneNumber: '(XX) XXXX-XXXX',
    },
    {
      name: 'Emergência em Saúde Pública',
      phoneNumber: '192',
    },
    {
      name: 'Ceres Regional',
      phoneNumber: '(XX) XXXX-XXXX',
    },
    {
      name: 'Anvisa',
      phoneNumber: '(XX) XXXX-XXXX',
    },
    // Adicione mais contatos aqui
  ];

  return (
    <div>
      <h1>Contatos Importantes</h1>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <strong>{contact.name}</strong>: {contact.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
