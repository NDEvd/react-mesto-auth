import { useEffect } from "react"
import { useForm } from "../hooks/useForm"

export default function Login ({ onLogin }) {

  const {values, handleChange, setValues} = useForm({});
  
  useEffect(() => {
    setValues({email: '', password: ''});
  }, []);
    
  const handleSubmit  = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      onLogin( values.password, values.email )
      .then(() => {
        setValues({email: '', password: ''});
      })
    }
  }

  return (
    <div className="popup__container popup__container_sign" > 
      <h2 className="popup__label popup__label_sign">Вход</h2>  
      <form className="popup__form" method="get" onSubmit={handleSubmit}> 
        <input className="popup__input popup__input_sign" type="email" name="email" id="email" required value={values.email} onChange={handleChange} placeholder="Email" minLength="2" maxLength="30"/>
        <span id="email-error" className="popup__error popup__error_visible" ></span>
        <input className="popup__input popup__input_sign" type="password" name="password" id="password" required value={values.password} onChange={handleChange} placeholder="Пароль" />
        <span id="password-error" className="popup__error popup__error_visible"></span>
        <button className="popup__save popup__save_sign" type="submit" id="register">Войти</button> 
      </form>
    </div>
  )
}