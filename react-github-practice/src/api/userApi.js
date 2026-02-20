const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/users`;


export const getUsers = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  return await response.json();
};

export const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

