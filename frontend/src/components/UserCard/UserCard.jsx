import React from "react"
import { Link } from "react-router-dom"
import "./UserCard.css"

const UserCard = ({ user }) => {


    return (
        <Link to={`/userPage/${user._id}`} className="card-container">
            <img className="pp" src={`http://localhost:8000/${user.profilePicture}`} />
            <h1>{user.firstName}</h1>
            <p>{user.email}</p>
        </Link>
    )
}

export default UserCard
