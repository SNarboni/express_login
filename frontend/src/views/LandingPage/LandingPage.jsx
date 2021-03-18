import { useEffect, useState } from 'react'
import "./LandingPage.css"


import UserCard from "../../components/UserCard/UserCard"

const LandingPage = () => {

  const [users, setUsers] = useState([])


  const searchUsers = () => {
    fetch("http://localhost:8000/welcome", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setUsers(response)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    searchUsers()
  }, [])

  if (users) {
    console.log(users.length)
    return (
      <div style={{ padding: "20px" }}>
        <h1>LandingPage</h1>
        <a href="/admin" style={{ color: "green" }}>Settings</a>
        <div>
          <h1>Voici la liste de nos utilisateurs</h1>
          <div className="cards">
            {users.map((user, index) => {
              return (
                <UserCard user={user}></UserCard>
              )
            })}
          </div>
        </div>

      </div>
    );
  } else {
    return (
      <div style={{ padding: "20px" }}>
        <h1>LandingPage</h1>
        <a href="/admin" style={{ color: "green" }}>Settings</a>

        <div>
          <h1>LOADING</h1>
        </div>
      </div>
    );
  }
};

export default LandingPage;
