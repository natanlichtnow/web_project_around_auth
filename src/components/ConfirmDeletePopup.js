import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({
  isOpen,
  onClose,
  onConfirm
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Tem certeza?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmDeletePopup;