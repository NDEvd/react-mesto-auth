import { useState, useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
import * as auth from '../utils/auth';
import '../index.css'

export default function Register({ onRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
      const onChangeEmail = function (e) {
        setEmail(e.target.value);
      };
      const onChangePassword = function (e) {
        setPassword(e.target.value);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        onRegister( password, email )
          // .then(resetForm)
          .then(() => navigate('/sign-in'))
          .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
      };

      useEffect(() => {
        if (localStorage.getItem('jwt')) {
          navigate('/');
        }
      }, []);
  
      useEffect(() => {
        setEmail('');
        setPassword('');
      }, []);

    return (
      <div className="popup__container popup__container_sign" > 
        <h2 className="popup__label popup__label_sign">Регистрация</h2>  
        <form className="popup__form" method="get" onSubmit={handleSubmit}> 
          <input className="popup__input popup__input_sign" type="email" name="email" id="email" required value={email} onChange={onChangeEmail} placeholder="Email" minLength="2" maxLength="30"/>
          <span id="email-error" className="popup__error popup__error_visible" ></span>
          <input className="popup__input popup__input_sign" type="password" name="password" id="password" required value={password} onChange={onChangePassword} placeholder="Пароль" />
          <span id="password-error" className="popup__error popup__error_visible"></span>
          <button className="popup__save popup__save_sign" type="submit" id="register">Зарегистрироваться</button> 
        </form>
        <div className="popup__text-link">
            <p className="popup__text">Уже зарегистрированы?</p>
            <Link className="popup__login-link" to="/sign-in">Войти</Link>
        </div>
      </div>
    )
 }