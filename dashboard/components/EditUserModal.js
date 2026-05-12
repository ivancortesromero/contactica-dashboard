export default function EditUserModal({
  user,
  onClose,
  onSubmit
}) {

  const handleSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onSubmit({
      full_name: formData.get('full_name'),
      telephone: formData.get('telephone'),
      verified: formData.get('verified') === 'on'
    });
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Edit User</h2>
        <p style={{ marginBottom: '24px' }}>
          Update details for <strong>{user.full_name}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="full_name"
              type="text"
              defaultValue={user.full_name}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <p className="static-email">
              {user.email}
            </p>
          </div>

          <div className="form-group">
            <label>Telephone</label>
            <input
              name="telephone"
              type="text"
              defaultValue={user.telephone || ''}
            />
          </div>

          <div className="verified-row">
            <label>Verified</label>
            <label className="switch">
              <input
                name="verified"
                type="checkbox"
                defaultChecked={user.verified}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}