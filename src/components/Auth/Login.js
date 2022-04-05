import propTypes from "prop-types";
import React from "react";
import PropTypes from "prop-types";

const login = (props) => {
  return (
    <div className='login-container'>
      <nav className='login'>
        <h2>Авторизация</h2>
        <p>Введите логин и пароль вашего акуаунта Github</p>
        <button className='github' onClick={() => props.authenticate()}>
          Войти
        </button>
      </nav>
    </div>
  );
};

login.protoTypes = {
  authenticate: propTypes.func.isRequired,
};

export default login;
