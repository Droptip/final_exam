export const fetchUsers = async () => {
  const response = await fetch('http://localhost:8080/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
    
  return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export const addUser = (name, lastName, email, birthDate) => {
    fetch(`http://localhost:8080/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastName, email, birthDate }),
    })
    .then((response) => response.json())
};

export const modifyUser = (id, name, lastName, email, birthDate) => {
    fetch(`http://localhost:8080/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastName, email, birthDate }),
    })
    .then((response) => response.json())
};