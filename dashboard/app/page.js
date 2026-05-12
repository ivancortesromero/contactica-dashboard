"use client";
import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users');

      if (!response.ok) {
        throw new Error('Error fetching users');
      }

      const data = await response.json();
      setUsers(data);

    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUser = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      telephone: formData.get('telephone'),
      role: formData.get('role'),
      verified: e.target.verified?.checked || false
    };

    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      await fetchUsers();
      setActiveModal(null);

    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setActiveModal('edit');
  };

  const handleDeleteUser = async () => {
    try {
      await fetch(
        `http://localhost:4000/api/users/${selectedUser.id}`,
        {
          method: 'DELETE'
        }
      );

      await fetchUsers();
      setActiveModal(null);

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSaveChanges = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  try {
    await fetch(
      `http://localhost:4000/api/users/${selectedUser.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          full_name: formData.get('full_name'),
          telephone: formData.get('telephone'),
          verified: formData.get('verified') === 'on'
        })
      }
    );

    await fetchUsers();
    setActiveModal(null);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

  return (
    <main className="container">
      <header>
        <div>
          <h1>Users</h1>
          <p style={{ color: '#a1a1aa' }}>Manage your team members and their roles.</p>
        </div>
        <button className="btn-primary" onClick={() => setActiveModal('create')}>
          + Create User
        </button>
      </header>

      <div className="card">
        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Joined</th>
                <th>Source</th>
                <th>Role</th>
                <th>Verified</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="user-info">
                    {}
                    <div>{user.full_name}</div>
                    <span>{user.email}</span>
                  </td>
                  <td className="last-activity">{user.joined}</td>
                  <td className="last-activity">{user.source || '—'}</td>
                  <td><span className="badge">{user.role}</span></td>
                  <td>{user.verified ? 'Yes' : 'No'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      disabled={user.source === 'WordPress'}
                      onClick={() => handleEditClick(user)}
                      style={{background:'none', border:'none', cursor:'pointer', marginRight:'10px'}}
                    >
                      ✏️
                    </button>
                    <button
                      disabled={user.source === 'WordPress'}
                      onClick={() => {
                        setSelectedUser(user);
                        setActiveModal('delete');
                    }}
                      style={{
                        background:'none',
                        border:'none',
                        cursor:'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {activeModal === 'create' && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>Create User</h2>
            
            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="full_name" type="text" required />
              </div>
      
              <div className="form-group">
                <label>Email address</label>
                <input name="email" type="email" required />
              </div>
      
              <div className="form-group">
                <label>Telephone</label>
                <input name="telephone" type="text" /> 
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
                  <input name="verified" type="checkbox" /> {/* AGREGA NAME */}
                  <span className="slider"></span>
                </label>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary"> {/* ASEGURA TYPE SUBMIT */}
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REMOVE USER */}
      {activeModal === 'delete' && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth: '400px' }}>
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>Remove User</h2>
            <p>
              Are you sure you want to remove <strong>{selectedUser?.full_name}</strong>?
              This action cannot be undone.
            </p>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveModal(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDeleteUser}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER */}
      {activeModal === 'edit' && selectedUser && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>Edit User</h2>
            <p style={{ marginBottom: '24px' }}>
              Update details for <strong>{selectedUser.full_name}</strong>
            </p>

            <form onSubmit={handleSaveChanges}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  name="full_name"
                  type="text" 
                  defaultValue={selectedUser.full_name} 
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <p className="static-email">{selectedUser.email}</p>
              </div>

              <div className="form-group">
                <label>Telephone <span style={{color: 'var(--text-dim)', fontWeight: 'normal'}}>(optional)</span></label>
                <input 
                  name="telephone"
                  type="text" 
                  defaultValue={selectedUser.telephone || ""} 
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="verified-row">
                <label style={{ fontWeight: '500' }}>Verified</label>
                <label className="switch">
                  <input 
                    name="verified"
                    type="checkbox" 
                    defaultChecked={selectedUser.verified} 
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}