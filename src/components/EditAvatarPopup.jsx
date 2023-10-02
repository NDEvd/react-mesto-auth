import { useRef, useEffect } from "react"
import PopupWithForm from "./PopupWithForm" 

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarLinkRef = useRef();

  useEffect(() => {
    avatarLinkRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
        
    const data = { avatar: avatarLinkRef.current.value }
    onUpdateAvatar(data);
  }

  return (
    <PopupWithForm id='chage-avatar' 
      title='Обновить аватар' 
      buttonTittle='Сохранить'
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      children={ 
        <>
          <input className="popup__input" type='url' name='avatar' id='avatar' placeholder="Ссылка на аватар" ref={avatarLinkRef}/>
          <span id="avatar-error" className="popup__error popup__error_visible" ></span>
        </>
      }
    /> 
  )
}