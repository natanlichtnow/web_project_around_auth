import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setAbout(currentUser.about || '');
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, about });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error" />
      <input
        className="popup__input"
        type="text"
        name="about"
        placeholder="Sobre mim"
        minLength="2"
        maxLength="200"
        required
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span className="popup__input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
