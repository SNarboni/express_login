import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const Admin = ({ match }) => {

    const [canEdit, setCanEdit] = useState(false)
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [ifEmailFalse, setIfEmailFalse] = useState("");
    // const [newAge, setNewAge] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [newProfilePicture, setNewProfilePicture] = useState("");

    const [tokenValid, setTokenValid] = useState('coucou')
    const [servResponse, setServResponse] = useState('')
    const history = useHistory()

    const getUserInfo = () => {
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
    }

    const checkToken = () => {
        setTokenValid(localStorage.getItem('token'))
        if (tokenValid) {
            if (!servResponse) {
                getUserInfo()
            } else { return }
        } else {
            console.log("changement de page")
            let path = `/login`;
            history.push(path);
        }
    }

    const editProfile = () => {
        setIfEmailFalse("")
        let verifEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(newEmail ? newEmail : servResponse.email);
        if (verifEmail) {
            setCanEdit(!canEdit)
            fetch("http://localhost:8000/admin", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                }, body: JSON.stringify({
                    _id: servResponse._id,
                    email: newEmail ? newEmail : servResponse.email,
                    firstName: newFirstName ? newFirstName : servResponse.firstName,
                    surname: newSurname ? newSurname : servResponse.surname,
                }),
            })
                .then((response) => {
                    return response.text();
                })
                .then((response) => {
                    console.log(response)
                    getUserInfo()
                }).catch((err) => {
                    console.log(err)
                })

        } else (
            setIfEmailFalse("L'email n'est pas au bon format")
        )

    }

    useEffect(() => {

        setTokenValid(localStorage.getItem('token'))
        checkToken()
    });

    return (
        <div>
            <h1>Admin</h1>
            <button type="submit" onClick={() => setCanEdit(!canEdit)} >Modifier</button>
            {ifEmailFalse ? (<h1>{ifEmailFalse}</h1>) : ""}

            {servResponse ?
                (canEdit ? (
                    <>
                        <button type="submit" onClick={() => editProfile()} >save</button>
                        <h1>{servResponse._id}</h1>
                        <h1>{servResponse.email}</h1>
                        <input type="email" onChange={(e) => setNewEmail(e.target.value)} />
                        <h1>{servResponse.firstName}</h1>
                        <input type="email" onChange={(e) => setNewFirstName(e.target.value)} />
                        <h1>{servResponse.surname}</h1>
                        <input type="email" onChange={(e) => setNewSurname(e.target.value)} />
                        <h1>{servResponse.age} ans</h1>
                        <img src={`http://localhost:8000/${servResponse.profilePicture}`} />
                    </>
                ) : (
                        <>
                            <h1>{servResponse._id}</h1>
                            <h1>{servResponse.email}</h1>
                            <h1>{servResponse.firstName}</h1>
                            <h1>{servResponse.surname}</h1>
                            <h1>{servResponse.age} ans</h1>
                            <img src={`http://localhost:8000/${servResponse.profilePicture}`} />
                        </>
                    )
                ) : (<h1>LOADING</h1>)
            }
        </div>
    )
}

export default Admin
