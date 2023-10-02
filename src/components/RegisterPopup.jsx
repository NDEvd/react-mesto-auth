export default function RegisterPopup({ img, text, isOpen, onClose }) { 

    return ( 
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`} > 
        <div className="popup__container"> 
        <img className="popup__result-img" src={img} alt="результат регистрации"/>
        <p className="popup__result-text" >{text}</p>
        <button className="popup__close-icon" type="button" title="close-icon" onClick={onClose}></button>
        </div>
      </div> 
    ) 
  } 