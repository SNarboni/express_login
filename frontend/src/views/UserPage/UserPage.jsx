import { useEffect, useState } from 'react'

const UserPage = ({ match }) => {

    const [userInfos, setUserInfos] = useState("")



    useEffect(() => {
        if (!userInfos) {
            searchUserInfos()
        }
    })

    const searchUserInfos = () => {
        fetch("http://localhost:8000/userPage", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            }, body: JSON.stringify({
                id: match.params.id
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setUserInfos(response)
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <div>
            <h1>UserPage</h1>

            <div>
                {userInfos ? (
                    <>
                        <h1>{userInfos._id}</h1>
                        <h1>{userInfos.email}</h1>
                        <h1>{userInfos.firstName}</h1>
                        <h1>{userInfos.surname}</h1>
                        <h1>{userInfos.age} ans</h1>
                        <img src={`http://localhost:8000/${userInfos.profilePicture}`} />
                    </>
                ) : (<h1>LOADING</h1>)}
            </div>
        </div>
    )
}

export default UserPage


