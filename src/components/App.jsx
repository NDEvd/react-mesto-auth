import { useState, useEffect } from "react"
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import '../index.css'
import * as auth from '../utils/auth.js';
import api from '../utils/Api'

import Header from './Header'
import Main from './Main'

import Footer from './Footer'
import ProtectedRouteElement from './ProtectedRouteElement'
import Register from './Register'
import Login from './Login'

import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup"
import RegisterPopup from "./RegisterPopup"
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import avatar from '../images/Avatar2.png'
import reg from '../images/icon-reg.svg'
import regError from '../images/icon-reg-error.svg'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar});
  
  const [cards, setCards] = useState([]);
  
  const firstAuth = (jwt) => {
    return auth.checkToken(jwt)
    .then(() => {
      if (jwt) {
        setLoggedIn(true);
        navigate('/');
      }
    })
    .catch(err => console.log(err)) 
  }
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) firstAuth(token)
  }, []);

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn]);

  const handleRegister = ( password, email ) => {
    return auth.register(password, email)
    .then((res) => {
      if (res.data) {
        setIsTooltipOpen(true);
        setIsTooltipSuccess(true);
        navigate('/sign-in');
        return res;
      }
    })
    .catch((err) => {
      setIsTooltipOpen(true);
      setIsTooltipSuccess(false);
      console.log(err);
    })
  }

  const handleLogin = ( password, email ) => {
    return auth.authorize(password, email)
    .then((res) => {
      if (res.token) {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('email', email);
        navigate('/')
      }
    })
    .catch((err) => console.log(err));
  }

  const handleExit = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
  }

  useEffect(() => {
    if (loggedIn) fetchInfo()
  }, [loggedIn])

  const fetchInfo = function () {
    api
    .getAllInfo()
      .then(([data, res]) => {
        setCurrentUser(data);
        setCards(res);
      })
      .catch((err) => console.log(err));
  }

  const handleEditProfilePopupOpen = function() {
    setIsEditProfilePopupOpen(true);
  }
  
  const handleAddPlacePopupOpen = function() {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarPopupOpen = function() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({link: card.link, name: card.name});
  }

  const closeAllPopups = function() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpen(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
    .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
         setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  } 

  function handleCardDelete(card) {
    api
    .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err));
  }

  const handleUpdateUser = function (data) {
    api
    .saveProfile(data)
      .then((data) => {
        setCurrentUser(data);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateAvatar = function (data) {
    api
    .saveAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  const handleAddPlaceSubmit = function (card) {
    api
    .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <div className="sticky-footer">
      <CurrentUserContext.Provider value={currentUser}>
      <Header onClick={handleExit} />
      <Routes>
        <Route path="/" 
          element={<ProtectedRouteElement
          loggedIn={loggedIn} 
          onClickAvatar={handleEditAvatarPopupOpen}
          onClickChange={handleEditProfilePopupOpen} 
          onClickAdd={handleAddPlacePopupOpen}
          handleCardClick={handleCardClick}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
          cards={cards}
          element={Main}
          />}
        />
        <Route path="/sign-up" 
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="/sign-in"
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/*"
          element={ loggedIn ? ( 
          <Navigate 
            to='/'
            replace
          />
          ) : (
          <Navigate 
            to="/sign-in" 
            replace
          />
          )}
        />
      </Routes>
      <Footer />
        
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} 
      /> 
        
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
     
      <ImagePopup card={selectedCard}
        onClose={closeAllPopups} 
      />

      <RegisterPopup isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        img={`${isTooltipSuccess ? reg : regError}`}
        text={`${isTooltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}
      />

      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
