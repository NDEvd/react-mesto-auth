export default function PopupWithForm({ id, title, buttonTittle, isOpen, onClose, onSubmit, children }) { 

  return ( 
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`popup-${id}`} > 
      <div className="popup__container"> 
      <h2 className="popup__label">{title}</h2>  
        <form className="popup__form" name={`form-${id}`} id={`form-${id}`} onSubmit={onSubmit}> 
        {children} 
        <button className="popup__save" type="submit" id={`save-${id}`}>{buttonTittle}</button> 
        </form> 
        <button className="popup__close-icon" type="button" title="close-icon" onClick={onClose} /> 
      </div> 
    </div> 
  ) 
} 