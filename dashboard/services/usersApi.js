const API_URL = 'http://localhost:4000/api/users';

export const getUsers = async () => {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return response.json();
};

export const createUser = async (user) => {

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error('Error creating user');
  }

  return response.json();
};

export const updateUser = async (id, user) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error('Error updating user');
  }

  return response.json();
};

export const deleteUser = async (id) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error deleting user');
  }
};