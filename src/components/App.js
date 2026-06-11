import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const history = useHistory();

  // ESC close popups
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    const isAnyPopupOpen =
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard ||
      isInfoTooltipOpen;

    if (isAnyPopupOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard,
    isInfoTooltipOpen
  ]);

  // check token
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        })
        .catch(console.error);
    }
  }, [history]);

  // load user + cards
useEffect(() => {
  if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        console.log('CARDS FROM API:', cardsData);

        setCurrentUser(userData);

       setCards(cardsData);
      })
      .catch((err) => console.error(err));
  }
}, [loggedIn]);
  // auth
  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      })
      .catch(() => {
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      })
      .catch(() => {
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/signin');
  };

  // LIKE FIX
const handleCardLike = (card) => {
  api.changeLikeCardStatus(card._id, card.isLiked)
    .then((updatedCard) => {
      setCards((state) =>
        state.map((c) =>
          c._id === card._id ? updatedCard : c
        )
      );
    })
    .catch(console.error);
};
  // delete card
  const handleCardDelete = (card) => {
  api.deleteCard(card._id)
    .then(() => {
      setCards((state) =>
        state.filter((c) => c._id !== card._id)
      );

      closeAllPopups();
    })
    .catch(console.error);
};

  // update user
  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.error);
  };

  // update avatar
  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.error);
  };

  // add card
  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(console.error);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    setCardToDelete(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditProfile={() => setIsEditProfilePopupOpen(true)}
            onAddPlace={() => setIsAddPlacePopupOpen(true)}
            onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={(card) => setCardToDelete(card)}
          />

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <Route>
            <Redirect to={loggedIn ? '/' : '/signin'} />
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isRegistrationSuccess}
        />
        <ConfirmDeletePopup
  isOpen={!!cardToDelete}
  onClose={closeAllPopups}
  onConfirm={() => {
    handleCardDelete(cardToDelete);
  }}
/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;