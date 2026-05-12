export default function CreateUserModal({
  onClose,
  onSubmit
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      full_name: formData.get('full_name'),
      email: formData.get('email'),
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

        <h2>Create User</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="full_name"
              type="text"
              required
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              required
            />
          </div>

          <div className="form-group">
            <label>Telephone</label>
            <input
              name="telephone"
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <span className="text-sm text-gray-600">
              Subscriber
            </span>
          </div>

          <div className="verified-row">
            <label>Verified</label>
            <label className="switch">
              <input
                name="verified"
                type="checkbox"
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
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}