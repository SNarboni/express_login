import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const Admin = () => {

    const [tokenValid, setTokenValid] = useState('coucou')
    const [servResponse, setServResponse] = useState('')
    const history = useHistory()


    useEffect(() => {
        setTokenValid(localStorage.getItem('token'))
        checkToken()
    });

    const checkToken = () => {
        setTokenValid(localStorage.getItem('token'))
        if (tokenValid) {
            if (!servResponse) {
                fetch("http://localhost:8000/admin", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        'Authorization': `Bearer ${tokenValid}`
                    },
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        console.log(response)
                        setServResponse(response)
                    }).catch((err) => {
                        console.log(err)
                    })
            } else { return }
        } else {
            console.log("changement de page")
            let path = `/login`;
            history.push(path);
        }
    }

    return (
        <div>
            <h1>Admin</h1>
            <h4>{servResponse.email}</h4>
            <h4>{servResponse.firstName}</h4>
            <h4>{servResponse.surname}</h4>
            <img src={`http://localhost:3000/userPP/${servResponse.profilePicture}`} />
        </div>
    )
}

export default Admin
