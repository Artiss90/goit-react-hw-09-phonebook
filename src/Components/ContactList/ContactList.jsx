import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { contactsOperations, contactsSelectors } from 'redux/contactsRedux';
//* импорт стилей
import style from './ContactList.module.css';
import fade from 'transitionsCSS/fade.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

/* eslint react/prop-types: 1 */

function ContactList() {
  const dispatch = useDispatch();
  // TODO фильтруем, показываем только те что совпадают*/
  const contacts = useSelector(contactsSelectors.getVisibleFilterContacts);

  const onClickDelete = id => dispatch(contactsOperations.deleteContact(id));
  return (
    // TODO Добавление анимации на добавление-удаление списка контактов
    <TransitionGroup component="ul" className={style.list}>
      {contacts &&
        contacts.map(contact => (
          <CSSTransition key={contact.id} timeout={250} classNames={fade}>
            <li key={contact.id} className={style.item}>
              <p className={style.contact}>
                <span>{contact.name}:</span>
                <span>{contact.number}</span>
              </p>
              <button type="button" onClick={() => onClickDelete(contact.id)}>
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
}

export default ContactList;
