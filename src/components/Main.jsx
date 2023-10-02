import { useContext } from 'react'
import pensil from '../images/profile-pensil.svg'
import avatarPensil from '../images/avatar-pensil.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Main({ onClickAvatar, onClickChange, onClickAdd, children }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
    <section className="profile content">
      <img className="profile__foto" src={currentUser.avatar} alt="фото" />
      <div className="profile__foto-change">
        <img className="profile__foto-change-img" src={avatarPensil} alt="изменить" onClick={onClickAvatar}/>
      </div>
      <div className="profile__info">
        <div className="profile__info-change-button">
          <div className="profile__name-profession">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button className="profile__change-button" type="button" title="change-button"><img className="profile__change-button-img" src={pensil} alt="изменить" onClick={onClickChange}/></button>
        </div>
        <button className="profile__add-button" type="button" title="add-button" onClick={onClickAdd}>+</button>
      </div>
    </section>
    <section className="content">
      <ul className="card-template" id="card-template">
        {children}
      </ul>
    </section> 
  </main>
  )
}
