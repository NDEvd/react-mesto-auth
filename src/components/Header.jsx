import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useState } from "react"

export default function Header({ onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlToggleClick = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <div>
      {isOpen && <div className="header-mobil">
        <p className="header-mobil__login-link">{localStorage.getItem('email')}</p>
        <Link className="header-mobil__login-link"
          to='/sign-in'
          onClick={onClick}>
          Выйти
        </Link>
      </div>}
    <div className="header">
      <img
      src={logo}
      alt='Место Россия'
      className="header__logo"
      />
      <Routes>
        <Route path="/" element={
          <div >
          <label className="opasity">
            <input type="checkbox" />
            <span className="menu" onClick={handlToggleClick}> <span className="hamburger"></span> </span>
          </label>
          <div className="header__email-exit">
            <p className="header__login-link">{localStorage.getItem('email')}</p>
            <Link className="header__login-link"
              to='/sign-in'
              onClick={onClick}>
              Выйти
            </Link>
          </div> 
          </div> 
        } />
        <Route path="/sign-up" element={
          <Link className="header__login-link"
            to='/sign-in'>
            Войти
          </Link> 
        } />
        <Route path="/sign-in" element={
          <Link className="header__login-link"
            to='/sign-up'>
            Регистрация
          </Link> 
        } />
      </Routes>
    </div>
    </div>
  )
}