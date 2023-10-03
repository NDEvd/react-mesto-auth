import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';

export default function Header({ email, onClick }) {

  return (
    <div  className="header">
      <img
      src={logo}
      alt='Место Россия'
      className="header__logo"
      />
      <Routes>
        <Route path="/" element={
          <div className="header__email-exit">
            <p className="header__login-link">{email}</p>
            <Link className="header__login-link"
              to='/sign-in'
              onClick={onClick}>
              Выйти
            </Link>
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
  )
}