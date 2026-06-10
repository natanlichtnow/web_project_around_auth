import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo">&#9670; EUA Afora</div>
      <nav className="header__nav">
        {loggedIn ? (
          <>
            <span className="header__email">{userEmail}</span>
            <button
              className="header__link header__link_type_signout"
              type="button"
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
            {location.pathname === '/signin' ? 'Inscreva-se' : 'Entrar'}
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
