import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

class Form extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      }),
    ),
  };

  state = { name: '', number: '', alertRepetition: '' };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  notify = field =>
    toast.warn(`поле ${field} не должно бить пустым`, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contactsProps = this.props.contacts;
    if (!name) {
      this.notify('Name');
    }
    if (!number) {
      this.notify('Number');
    }
    if (contactsProps.find(contactName => contactName.name === name)) {
      /**проверка на повторение имён */
      this.setState({ alertRepetition: `${name} is already in contacts!` });
      this.reset();
      return;
    }
    if (name && number) {
      this.props.onSubmitForm(this.state);
    }

    this.reset();
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  onResetAlert = () => {
    this.setState({ alertRepetition: '' });
  };

  render() {
    const { name, number, alertRepetition } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={style.container}>
          <label htmlFor={this.nameInputId} className={style.item}>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              id={this.nameInputId}
            />
          </label>
          <label htmlFor={this.numberInputId} className={style.item}>
            Number
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
              id={this.numberInputId}
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
          onEntered={() => this.onResetAlert()}
        >
          <Alert message={alertRepetition} />
        </CSSTransition>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getContactsItems(state),
});

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: contact => dispatch(contactsOperations.addContact(contact)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
