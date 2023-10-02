export default function ImagePopup({ card, onClose }) { 

  return ( 
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`} id="popup-image"> 
      <div className="popup__open-image"> 
      <img className="popup__image" src={card?.link} alt={card?.name} /> 
      <p className="popup__image-title">{card?.name}</p> 
      <button className="popup__close-icon" type="button" title="close-icon" onClick={onClose}></button> 
    </div> 
  </div> 
    ) 
}