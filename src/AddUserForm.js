import React, { useState } from "react";

function UserForm({ onUserAdded, shouldUpdateUsers }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUserAdded();
        setName("");
        setAge("");
        setEmail("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(event) => setAge(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
