import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

export default function Header({ link, action }) {
  return (
    <div  className="header">
      <img
      src={logo}
      alt='Место Россия'
      className="header__logo"
      />
      <Link className="header__login-link"
      to={link}>
      {action}
      </Link>
    </div>
  )
}