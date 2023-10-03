import { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom';
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
  const [isSucsesRegister, setIsSucsesRegister] = useState(false);
  const [isErrorRegister, setIsErrorRegister] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar});
  
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState('');
  
  const firstAuth = (jwt) => {
    return auth.checkToken(jwt).then(() => {
      if (jwt) {
        setLoggedIn(true);
        setEmail(email);
        navigate('/');
      }
    })
  }
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    firstAuth(token);
  }, [])

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn]);

  const handleRegister = ( password, email ) => {
    return auth.register(password, email)
    .then((res) => {
      if (!res.data || res.statusCode === 400) {
        setIsErrorRegister(true);
        throw new Error('Что-то пошло не так');
      }
      if (res.data) {
        setIsSucsesRegister(true);
        navigate('/sign-in');
        return res;
      }
    })
    .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
  }

  const handleLogin = ( password, email ) => {
    return auth.authorize(password, email)
    .then((res) => {
      if (!res) throw new Error('Неправильные имя пользователя или пароль');
      if (res.token) {
        setLoggedIn(true);
        setEmail(email);
        localStorage.setItem('jwt', res.token);
        navigate('/')
      }
    })
    .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
  }

  const handleExit = () => {
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    if (token) {
      fetchInfo();
    }
  }, [token]);

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
    setIsSucsesRegister(false);
    setIsErrorRegister(false);
  }

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
      <Header email={email} onClick={handleExit} />
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

      <RegisterPopup isOpen={isSucsesRegister}
        onClose={closeAllPopups}
        img={reg}
        text='Вы успешно зарегистрировались!'
      />

      <RegisterPopup isOpen={isErrorRegister}
        onClose={closeAllPopups}
        img={regError}
        text='Что-то пошло не так! Попробуйте ещё раз.'
      />

      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
