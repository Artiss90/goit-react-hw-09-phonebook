import { createSelector } from 'reselect';

const getContactsFilter = state => state.contacts.filter;
const getContactsItems = state => state.contacts.items;
const getContactsLoading = state => state.contacts.loading;
const getContactsError = state => state.contacts.error;

const getVisibleFilterContacts = createSelector(
  [getContactsFilter, getContactsItems],
  (filter, allContacts) => {
    const normalizedFilter = filter.toLowerCase();
    return allContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  },
);
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getContactsFilter,
  getContactsItems,
  getContactsLoading,
  getContactsError,
  getVisibleFilterContacts,
};
