import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useEffect, useContext } from "react"
import PopupWithForm from "./PopupWithForm"
import { useForm } from "../hooks/useForm"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  
  const {values, handleChange, setValues} = useForm({});

  useEffect(() => {
    setValues({name: currentUser?.name, about: currentUser?.about});
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { name: values.name, about: values.about }
    onUpdateUser(data);
  }
  
  return (
    <PopupWithForm id='chage-button'  
      title='Редактировать профиль' 
      buttonTittle='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input className="popup__input" type="text" name="name" id="name" value={values.name} placeholder="Ваше имя" onChange={handleChange} minLength="2" maxLength="40" required />
        <span id="name-error" className="popup__error popup__error_visible" ></span>
        <input className="popup__input" type="text" name="about" id="about" value={values.about} placeholder="Ваша профессия" onChange={handleChange} minLength="2" maxLength="40" required />
        <span id="about-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  )
}