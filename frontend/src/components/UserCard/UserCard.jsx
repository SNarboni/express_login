import React from "react"
import "./UserCard.css"

const UserCard = ({ user }) => {


    return (
        <div className="card-container">
            <img className="pp" src={`http://localhost:8000/${user.profilePicture}`} />
            <h1>{user.firstName}</h1>
            <p>{user.email}</p>
        </div>
    )
}

export default UserCard
