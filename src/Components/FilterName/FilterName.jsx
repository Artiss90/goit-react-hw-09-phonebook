import React from 'react';
import style from './FilterName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { contactsAction, contactsSelectors } from 'redux/contactsRedux';

/* eslint react/prop-types: 1 */

function FilterName() {
  const dispatch = useDispatch();
  const value = useSelector(contactsSelectors.getContactsFilter);
  const onChange = e => dispatch(contactsAction.changeFilter(e.target.value));

  return (
    <label className={style.container}>
      <input
        className={style.input}
        type="text"
        value={value}
        onChange={onChange}
        placeholder=" Find contacts by name"
      />
    </label>
  );
}

export default FilterName;
