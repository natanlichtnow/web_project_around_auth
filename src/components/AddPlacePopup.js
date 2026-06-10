import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link });
    setName('');
    setLink('');
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Novo local"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Criar"
    >
      <input
        className="popup__input"
        type="text"
        name="name"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error" />
      <input
        className="popup__input"
        type="url"
        name="link"
        placeholder="Link da imagem"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
