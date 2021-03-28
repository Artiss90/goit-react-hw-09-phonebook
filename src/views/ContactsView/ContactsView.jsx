import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  contactsAction,
  contactsOperations,
  contactsSelectors,
} from 'redux/contactsRedux';
import Form from 'Components/Form/Form';
import ContactList from 'Components/ContactList/ContactList';
import FilterName from 'Components/FilterName/FilterName';
import Logo from 'Components/Logo/Logo';
import classNames from 'classnames/bind';
//*import style
import style from './ContactsView.module.css';
import appearSlide from 'transitionsCSS/appearSlide.module.css'; /**модули CSS указывать до CSSTransition */
// import fade from 'transitionsCSS/fade.module.css';
import fadeScale from 'transitionsCSS/fadeScale.module.css';
import { CSSTransition } from 'react-transition-group';

/* eslint react/prop-types: 1 */

let mixStyle = classNames.bind(style);

function ContactsView() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContactsItems);
  const isLoadingContact = useSelector(contactsSelectors.getContactsLoading);
  // const errorContacts = useSelector(contactsSelectors.getContactsError);
  const clearFilter = () => dispatch(contactsAction.changeFilter(''));
  const fetchContacts = useCallback(
    () => dispatch(contactsOperations.fetchContact()),
    [dispatch],
  );

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <>
      <CSSTransition
        //TODO добавляем анимацию появления Logo при загрузке страницы
        in={true}
        appear={true}
        timeout={500}
        classNames={appearSlide}
        unmountOnExit
      >
        <Logo />
      </CSSTransition>
      <CSSTransition
        //TODO добавляем анимацию появления Logo при загрузке страницы
        in={true}
        appear={true}
        timeout={500}
        classNames={appearSlide}
        unmountOnExit
      >
        <Form />
      </CSSTransition>

      <CSSTransition
        //TODO Анимация появления-исчезания поля для фильтра контактов по условию
        in={contacts.length > 1}
        timeout={1000}
        classNames={fadeScale}
        unmountOnExit
        onExit={() => clearFilter()}
      >
        <FilterName />
      </CSSTransition>
      <h2 className={mixStyle('title', 'center')}>Contacts</h2>
      {isLoadingContact ? (
        <Loader
          className={mixStyle('center')}
          type="Oval"
          color="#1976d2"
          height={100}
          width={100}
          timeout={0} //3 secs
        />
      ) : (
        <ContactList />
      )}
    </>
  );
}

export default memo(ContactsView);
