import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react'

export default function Card({ cardLink, cardName, cardOwnerId, likes, allLikes, cardId, onCardClick, onCardDeleteClick, onCardLike}) { 

  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardOwnerId === currentUser._id;

  const card = { name: cardName, link: cardLink, likes: allLikes, _id: cardId, owner: cardOwnerId }
  
  const isLiked = allLikes.some((i) => i._id === currentUser._id);

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleClick = () => {
    onCardClick(card);
  }

  const handleDeleteClick = () => {
    onCardDeleteClick(card);
  }

  return (
    <li className="card-template__element" >
      <img className="card-template__image" src={cardLink} alt={cardName} onClick={handleClick}/>
      <div className="card-template__title-like">
        <h2 className="card-template__title">{cardName}</h2>
        <div className="card-template__like-counter">
          <button className={`card-template__like ${isLiked && 'card-template__like_active'}`} type="button" title="like" onClick={handleLikeClick}></button>
          <span className="card-template__counter">{likes}</span>
        </div>
      </div>
      {isOwn && <button className="card-template__delete" type="button" title="delete" onClick={handleDeleteClick} />}
    </li>
  )
}