"use client";
import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); // Iniciamos con lista vacía
  const [loading, setLoading] = useState(true);

  // Consumir el API de Express
  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la red');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando usuarios:", err);
        setLoading(false);
      });
  }, []);

  // Función para abrir el modal de edición con los datos del usuario
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setActiveModal('edit');
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
                <th>Synced</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="user-info">
                    {/* Usamos las propiedades exactas que vienen del backend */}
                    <div>{user.full_name}</div>
                    <span>{user.email}</span>
                  </td>
                  <td className="last-activity">{user.joined}</td>
                  <td className="last-activity">{user.source || '—'}</td>
                  <td><span className="badge">{user.role}</span></td>
                  <td style={{ textAlign: 'center', opacity: 0.5 }}>
                    {user.verified ? '✅' : '⊗'}
                  </td>
                  <td style={{ textAlign: 'center', opacity: 0.5 }}>🕒</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleEditClick(user)}
                      style={{background:'none', border:'none', cursor:'pointer', marginRight:'10px'}}
                    >
                      ✏️
                    </button>
                    <button onClick={() => setActiveModal('delete')} style={{background:'none', border:'none', cursor:'pointer'}}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL: CREATE USER */}
      {activeModal === 'create' && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>Create User</h2>
            <p style={{ marginBottom: '24px' }}>
              Send an invitation to join your app.
            </p>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="e.g. John Doe" />
            </div>
      
            <div className="form-group">
              <label>Email address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
              />
            </div>
      
            <div className="form-group">
              <label>Telephone <span style={{color: 'var(--text-dim)', fontWeight: 'normal'}}>(optional)</span></label>
              <input type="text" placeholder="+1 234 567 8900" />
            </div>
      
            <div className="form-group">
              <label>Source</label>
              <p className="static-data">dashboard</p>
            </div>

            <div className="form-group">
              <label>Role</label>
              <p className="static-data">Suscriptor</p>
            </div>
      
            <div className="verified-row">
              <label style={{ fontWeight: '500' }}>Verified</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveModal(null)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => setActiveModal(null)}>
                Create User
              </button>
            </div>
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
              Are you sure you want to remove <strong>Carlangas Zipatoque</strong>?
              This action cannot be undone.
            </p>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveModal(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={() => setActiveModal(null)}>
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

            <div className="form-group">
              <label>Full Name</label>
              <input 
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
                type="text" 
                defaultValue={selectedUser.telephone || ""} 
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className="verified-row">
              <label style={{ fontWeight: '500' }}>Verified</label>
              <label className="switch">
                <input 
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
              <button className="btn-primary" onClick={() => setActiveModal(null)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}