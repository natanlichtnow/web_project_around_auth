import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        src={logo}
        alt="Around the U.S"
        className="header__logo"
      />

      <nav className="header__nav">
        {loggedIn ? (
          <>
            <span className="header__email">{userEmail}</span>
            <button
              type="button"
              className="header__link header__link_type_signout"
              onClick={onSignOut}
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            className="header__link"
            to={location.pathname === '/signin' ? '/signup' : '/signin'}
          >
            {location.pathname === '/signin'
              ? 'Inscreva-se'
              : 'Entrar'}
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;