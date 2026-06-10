import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Atualizar foto de perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="url"
        name="avatar"
        placeholder="Link para nova foto"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error" />
    </PopupWithForm>
  );
}



export default EditAvatarPopup;
