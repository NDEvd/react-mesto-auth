import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

export default function Login ({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
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
    
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/');
    }
  }, []);

  const handleSubmit  = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin( password, email )
      .then(() => {
        setEmail('');
        setPassword('');
      })
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