function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close" type="button" onClick={onClose} />
        {card && (
          <>
            <img className="popup__image" src={card.link} alt={card.name} />
            <p className="popup__caption">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;
