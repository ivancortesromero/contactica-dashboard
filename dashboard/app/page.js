"use client";
import { useState } from 'react';

export default function UsersPage() {
  const [activeModal, setActiveModal] = useState(null);

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
            <tr>
              <td className="user-info">
                <div>Carlangas Zipatoque</div>
                <span>carlangaszipatoque@gmail.com</span>
              </td>
              {/* Source luce igual que Joined */}
              <td>May 11, 2026</td>
              <td>—</td> 
              <td><span className="badge">Admin</span></td>
              <td style={{ textAlign: 'center', opacity: 0.5 }}>⊗</td>
              <td style={{ textAlign: 'center', opacity: 0.5 }}>🕒</td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => setActiveModal('edit')} style={{background:'none', border:'none', cursor:'pointer', marginRight:'10px'}}>✏️</button>
                <button onClick={() => setActiveModal('delete')} style={{background:'none', border:'none', cursor:'pointer'}}>🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Los modales se mantienen igual */}
      {activeModal === 'create' && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>Create User</h2>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="name@example.com" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select>
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
              <button className="btn-primary">Create User</button>
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
      {activeModal === 'edit' && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
            <h2>Edit User</h2>
            <p style={{ marginBottom: '24px' }}>
              Update details for <strong>Carlangas Zipatoque</strong>
            </p>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue="Carlangas Zipatoque" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                defaultValue="carlangaszipatoque@gmail.com" 
                style={{ borderColor: 'var(--accent)' }} // Simula el foco azul de la imagen
              />
            </div>

            <div className="form-group">
              <label>Telephone <span style={{color: 'var(--text-dim)', fontWeight: 'normal'}}>(optional)</span></label>
              <input type="text" defaultValue="+1 234 567 8900" />
            </div>

            <div className="verified-row">
              <label style={{ fontWeight: '500' }}>Verified</label>
              <label className="switch">
                <input type="checkbox" defaultChecked />
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