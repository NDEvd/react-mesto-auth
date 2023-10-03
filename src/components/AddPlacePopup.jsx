import { useEffect } from "react"
import PopupWithForm from "./PopupWithForm" 
import { useForm } from "../hooks/useForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    const card = { name: values.name, link: values.place }
    onAddPlace(card);
  }

  useEffect(() => {
    setValues({name: '', place: ''});
  }, [isOpen]);
  
  return (
    <PopupWithForm id='add-button'
      title='Новое место' 
      buttonTittle='Создать' 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}>
        <input className="popup__input" type="text" name="name" id="name-img" value={values.name} onChange={handleChange} placeholder="Название" minLength="2" maxLength="30" required />
        <span id="name-img-error" className="popup__error popup__error_visible" ></span>
        <input className="popup__input" type="url" name="place" id="place" value={values.place} onChange={handleChange} placeholder="Ссылка на картинку" required />
        <span id="place-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  )
}