"use client";
import { useEffect, useState } from 'react';
import UserTable from '../../components/UserTable';
import CreateUserModal from '../../components/CreateUserModal';
import EditUserModal from '../../components/EditUserModal';
import DeleteUserModal from '../../components/DeleteUserModal';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../../services/usersApi';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    type: null,
    user: null
  });

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
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

  const openCreateModal = () => {
    setModal({ type: 'create', user: null });
  };

  const openEditModal = (user) => {
    setModal({ type: 'edit', user });
  };

  const openDeleteModal = (user) => {
    setModal({ type: 'delete', user });
  };

  const closeModal = () => {
    setModal({ type: null, user: null });
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      await fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await updateUser(modal.user.id, userData);
      await fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(modal.user.id);
      await fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <main className="container">
      <header>
        <div>
          <h1>Users</h1>
          <p style={{ color: '#a1a1aa' }}>
            Manage your team members
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={openCreateModal}
        >
          + Create User
        </button>
      </header>
      <UserTable
        users={users}
        loading={loading}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />
      {modal.type === 'create' && (
        <CreateUserModal
          onClose={closeModal}
          onSubmit={handleCreateUser}
        />
      )}
      {modal.type === 'edit' && modal.user && (
        <EditUserModal
          user={modal.user}
          onClose={closeModal}
          onSubmit={handleUpdateUser}
        />
      )}
      {modal.type === 'delete' && modal.user && (
        <DeleteUserModal
          user={modal.user}
          onClose={closeModal}
          onConfirm={handleDeleteUser}
        />
      )}
    </main>
  );
}
