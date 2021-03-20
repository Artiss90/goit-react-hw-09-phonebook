import React from 'react';
import PropTypes from 'prop-types';
import style from './Alert.module.css';
/* eslint react/prop-types: 1 */

function Alert({ message }) {
  return (
    <>
      <p className={style.alert}>{message}</p>
    </>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;
