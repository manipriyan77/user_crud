import React, { useState, useEffect } from "react";
import UserForm from "./AddUserForm";
import UserList from "./Users";

function App() {
  const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);

  const handleUserAdded = () => {
    setShouldUpdateUsers(true);
  };

  useEffect(() => {
    if (shouldUpdateUsers) {
      fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
          setShouldUpdateUsers(false);
          console.log(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [shouldUpdateUsers]);

  return (
    <div>
      <UserForm onUserAdded={handleUserAdded} shouldUpdateUsers={shouldUpdateUsers} />
      <UserList shouldUpdateUsers={shouldUpdateUsers} />
    </div>
  );
}

export default App;
