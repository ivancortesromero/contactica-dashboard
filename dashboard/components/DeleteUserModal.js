export default function DeleteUserModal({
  user,
  onClose,
  onConfirm
}) {

  return (
    <div className="overlay">
      <div
        className="modal"
        style={{ maxWidth: '400px' }}
      >

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Remove User</h2>

        <p>
          Are you sure you want to remove{' '}
          <strong>{user.full_name}</strong>?
          This action cannot be undone.
        </p>

        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-danger"
            onClick={onConfirm}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}