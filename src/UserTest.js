import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "./api";

function UserTest() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

   API.get("/users/all")
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