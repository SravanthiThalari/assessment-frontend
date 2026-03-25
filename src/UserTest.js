import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTest() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8080/users/all")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  return (
    <div>
      <h2>Users List</h2>

      {users.map((u) => (
        <p key={u.id}>{u.name} - {u.email}</p>
      ))}

    </div>
  );
}

export default UserTest;