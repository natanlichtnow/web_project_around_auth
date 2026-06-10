function PopupWithForm({ name, title, isOpen, onClose, onSubmit, buttonText, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__button" type="submit">
            {buttonText || 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
