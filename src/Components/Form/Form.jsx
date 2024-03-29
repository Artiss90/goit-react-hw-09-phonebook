import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { contactsOperations, contactsSelectors } from 'redux/contactsRedux';
import Alert from 'Components/Alert/Alert';
//* import style
import 'react-toastify/dist/ReactToastify.css';
import style from './Form.module.css';
import fade from 'transitionsCSS/fade.module.css';
import { CSSTransition } from 'react-transition-group';

/* eslint react/prop-types: 1 */

function Form() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContactsItems);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [alertRepetition, setAlertRepetition] = useState('');

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();

  const notify = field =>
    toast.warn(`поле ${field} не должно бить пустым`, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      notify('Name');
    }
    if (!number) {
      notify('Number');
    }
    if (contacts.find(contactName => contactName.name === name)) {
      /**проверка на повторение имён */
      setAlertRepetition(`${name} is already in contacts!`);
      reset();
      return;
    }
    if (name && number) {
      dispatch(contactsOperations.addContact({ name, number }));
    }

    reset();
  };

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };
  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const onResetAlert = () => {
    setAlertRepetition('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.container}>
        <label htmlFor={nameInputId} className={style.item}>
          Name
          <input
            className={style.inputName}
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
            id={nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="The name can only consist of letters, apostrophes, dashes and spaces. For instance Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label htmlFor={numberInputId} className={style.item}>
          Number
          <input
            className={style.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleChangeNumber}
            id={numberInputId}
            pattern="/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g"
            title="Phone number can contain numbers, spaces, dashes, pot-bellied brackets and can start with +"
            required
          />
        </label>
        <ToastContainer />
        <button type="submit">Add contact</button>
      </form>
      <CSSTransition
        //TODO Анимация появления-исчезания предупреждения о совпадении имён по условию
        in={alertRepetition.length > 0}
        timeout={3000}
        classNames={fade}
        unmountOnExit
        onEntered={() => onResetAlert()}
      >
        <Alert message={alertRepetition} />
      </CSSTransition>
    </>
  );
}

export default Form;
