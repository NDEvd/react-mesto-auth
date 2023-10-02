import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
// import * as auth from '../utils/auth';
// import '../index.css'

export default function Login ({ onLogin }) {

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
  
      useEffect(() => {
        setEmail('');
        setPassword('');
      }, []);

      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //   onLogin({ password, email })
      //     // .then(resetForm)
      //     .then(() => navigate('/'))
      //     .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
      // };
    
      // useEffect(() => {
      //   if (localStorage.getItem('jwt')) {
      //     navigate('/');
      //   }
      // }, []);

      const handleSubmit  = (e) => {
        e.preventDefault();
        
        if (email && password) {
          
          onLogin( password, email )
          .then(() => {
            setEmail('');
            setPassword('');
          })
          .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
        }
      }

    return (
      <div className="popup__container popup__container_sign" > 
        <h2 className="popup__label popup__label_sign">Вход</h2>  
        <form className="popup__form" method="get" onSubmit={handleSubmit}> 
          <input className="popup__input popup__input_sign" type="email" name="email" id="email" required value={email} onChange={onChangeEmail} placeholder="Email" minLength="2" maxLength="30"/>
          <span id="email-error" className="popup__error popup__error_visible" ></span>
          <input className="popup__input popup__input_sign" type="password" name="password" id="password" required value={password} onChange={onChangePassword} placeholder="Пароль" />
          <span id="password-error" className="popup__error popup__error_visible"></span>
          <button className="popup__save popup__save_sign" type="submit" id="register">Войти</button> 
        </form>
      </div>
    )
 }