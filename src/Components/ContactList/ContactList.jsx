import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { contactsOperations, contactsSelectors } from 'redux/contactsRedux';
//* импорт стилей
import style from './ContactList.module.css';
import fade from 'transitionsCSS/fade.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

/* eslint react/prop-types: 1 */

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      }),
    ).isRequired,
    onClickDelete: PropTypes.func.isRequired,
  };
  render() {
    const { contacts, onClickDelete } = this.props;
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
}

const mapStateToProps = state => {
  /** фильтруем, показываем только те что совпадают*/
  return {
    contacts: contactsSelectors.getVisibleFilterContacts(state),
    isLoadingContact: contactsSelectors.getContactsLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClickDelete: id => dispatch(contactsOperations.deleteContact(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
