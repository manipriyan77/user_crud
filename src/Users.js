import React, { useState, useEffect } from "react";

function UserList({ shouldUpdateUsers }) {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, [shouldUpdateUsers]);

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setName("");
    setAge("");
    setEmail("");
  };

  const handleSubmitEdit = (event, userId) => {
    event.preventDefault();
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the user with the new data
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return data;
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        setEditingUserId(null);
        setName("");
        setAge("");
        setEmail("");
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted user from the list of users
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {editingUserId === user.id ? (
            <form onSubmit={(event) => handleSubmitEdit(event, user.id)}>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
              <input type="number" value={age} onChange={(event) => setAge(event.target.value)} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </form>
          ) : (
            <div>
              {user.name}, {user.age}, {user.email}
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
