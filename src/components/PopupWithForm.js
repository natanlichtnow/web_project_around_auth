function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        <h2 className="popup__title">{title}</h2>

        <form className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;