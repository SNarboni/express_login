import React from 'react'
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/login" style={{color: "green"}}>Se connecter</Link>
            <Link to="/signUp" style={{color: "green"}}>S'inscrire</Link>
        </div>
    )
}

export default Home;
