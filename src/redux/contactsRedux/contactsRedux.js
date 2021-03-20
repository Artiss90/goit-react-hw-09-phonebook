import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { contactsAction } from 'redux/contactsRedux';

const itemsRedux = createReducer([], {
  [contactsAction.fetchContactsSuccess]: (_, { payload }) => payload,
  [contactsAction.addContactsSuccess]: (_, { payload }) =>
    /**добавляем новый контакт в в состояние контактов */
    [..._, payload],

  [contactsAction.deleteContactsSuccess]: (_, { payload }) =>
    _.filter(contact => contact.id !== payload),
});

const filterRedux = createReducer('', {
  [contactsAction.changeFilter]: (_, { payload }) => payload,
});

const loadingRedux = createReducer(false, {
  [contactsAction.fetchContactsRequest]: () => true,
  [contactsAction.fetchContactsSuccess]: () => false,
  [contactsAction.fetchContactsError]: () => false,
  [contactsAction.addContactsRequest]: () => true,
  [contactsAction.addContactsSuccess]: () => false,
  [contactsAction.addContactsError]: () => false,
  [contactsAction.deleteContactsRequest]: () => true,
  [contactsAction.deleteContactsSuccess]: () => false,
  [contactsAction.deleteContactsError]: () => false,
});

//*абстрагируем вывод ошибки
const setError = (_, { payload }) => payload.message;

const errorRedux = createReducer(null, {
  [contactsAction.fetchContactsError]: setError,
  [contactsAction.addContactsError]: setError,
  [contactsAction.deleteContactsError]: setError,
});

export default combineReducers({
  items: itemsRedux,
  filter: filterRedux,
  loading: loadingRedux,
  error: errorRedux,
});
