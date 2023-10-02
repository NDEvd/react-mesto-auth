import { useState, useEffect } from "react"
import PopupWithForm from "./PopupWithForm" 

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

    const onChangeName = function (e) {
      setName(e.target.value);
    };
    const onChangeLink = function (e) {
      setLink(e.target.value);
    };

    function handleSubmit(e) {
      e.preventDefault();
      const card = { name, link }
      onAddPlace(card);
    }

    useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]);
  
    return (
      <PopupWithForm id='add-button'
      title='Новое место' 
      buttonTittle='Создать' 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
        children={ 
          <>
            <input className="popup__input" type="text" name="name" id="name-img" required value={name} onChange={onChangeName} placeholder="Название" minLength="2" maxLength="30"/>
            <span id="name-img-error" className="popup__error popup__error_visible" ></span>
            <input className="popup__input" type="url" name="place" id="place" required value={link} onChange={onChangeLink} placeholder="Ссылка на картинку" />
            <span id="place-error" className="popup__error popup__error_visible"></span>
          </>
        }
      /> 
    )
  }