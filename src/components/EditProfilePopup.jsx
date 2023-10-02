import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useState, useEffect, useContext } from "react"
import PopupWithForm from "./PopupWithForm"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onChangeName = function (e) {
    setName(e.target.value);
  };
  const onChangeAbout = function (e) {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { name, about: description }
    onUpdateUser(data);
    console.log(data);
  }
  
  return (
    <PopupWithForm id='chage-button'  
      title='Редактировать профиль' 
      buttonTittle='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      children={ 
        <> 
          <input className="popup__input" type="text" name="name" id="name" value={name} placeholder="Ваше имя" onChange={onChangeName} minLength="2" maxLength="40" />
          <span id="name-error" className="popup__error popup__error_visible" ></span>
          <input className="popup__input" type="text" name="about" id="about" value={description} placeholder="Ваша профессия" onChange={onChangeAbout} minLength="2" maxLength="40" />
          <span id="about-error" className="popup__error popup__error_visible"></span>
        </> 
      }
    /> 
  )
}