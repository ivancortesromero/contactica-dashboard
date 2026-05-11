"use client";
import { useState } from 'react';

export default function UsersPage() {
  const [activeModal, setActiveModal] = useState(null); // 'create', 'edit', 'delete' o null

  const closeModal = () => setActiveModal(null);

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
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="user-info">
                <div>Carlangas Zipatoque</div>
                <span>carlangaszipatoque@gmail.com</span>
              </td>
              <td>May 11, 2026</td>
              <td><span className="badge">Admin</span></td>
              <td>
                <button onClick={() => setActiveModal('edit')} style={{background:'none', border:'none', cursor:'pointer', marginRight:'10px'}}>✏️</button>
                <button onClick={() => setActiveModal('delete')} style={{background:'none', border:'none', cursor:'pointer'}}>🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL: CREATE */}
      {activeModal === 'create' && (
        <div className="overlay">
          <div className="modal">
            <h2>Create User</h2>
            <p>Send an invitation to join your app.</p>
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
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary">Create User</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT */}
      {activeModal === 'edit' && (
        <div className="overlay">
          <div className="modal">
            <h2>Edit User</h2>
            <p>Update details for <b>Carlangas Zipatoque</b></p>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue="Carlangas Zipatoque" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue="carlangaszipatoque@gmail.com" />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE */}
      {activeModal === 'delete' && (
        <div className="overlay">
          <div className="modal">
            <h2>Remove User</h2>
            <p>Are you sure you want to remove <b>Carlangas Zipatoque</b>? This action cannot be undone.</p>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-danger" onClick={closeModal}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}