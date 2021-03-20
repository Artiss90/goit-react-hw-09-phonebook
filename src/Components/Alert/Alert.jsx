import React from 'react';
import PropTypes from 'prop-types';
import style from './Alert.module.css';
/* eslint react/prop-types: 1 */

const Alert = ({ message }) => (
  <>
    <p className={style.alert}>{message}</p>
  </>
);

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;
