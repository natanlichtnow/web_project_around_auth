import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes && card.likes.some((like) => like === currentUser._id);

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          onClick={() => onCardDelete(card)}
        />
      )}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
            type="button"
            onClick={() => onCardLike(card)}
          />
          <span className="card__like-count">{card.likes ? card.likes.length : 0}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
