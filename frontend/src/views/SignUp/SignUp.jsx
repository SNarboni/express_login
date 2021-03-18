import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isValid, setIsValid] = useState("");
  const [error, setError] = useState("");
  const [servResponse, setServResponse] = useState(" ")
  const history = useHistory();


  const createAcount = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("surname", surname);
    formData.append("age", age);
    formData.append("secondPassword", secondPassword);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);

    fetch("http://localhost:8000/signUp", {
      method: "POST",
      body: formData,
      // JSON.stringify({
      //   email: email,
      //   firstName: firstName,
      //   surname: surname,
      //   age: age,
      //   secondPassword: secondPassword,
      //   password: password,
      //   profilePicture: profilePicture,

      // }),
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        setServResponse(response)
        if (response === `Bienvenue parmis nous ${firstName}`) {
          let path = `/login`;
          history.push(path);
        }
      });
  };

  useEffect(() => {
    setError("")
    setIsValid("false")
    let verifEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    if (verifEmail && password.length >= 8 && secondPassword.length >= 8) {
      setIsValid(true)
      console.log(isValid)
    } else if ((password.length < 8 && password.length > 1) || (secondPassword.length < 8 && secondPassword.length > 1)) {
      setError("le mot de passe doit contenir au moin 8 caractères")
    }
    else {
      setError("merci de bien remplir le formulaire")
      setIsValid(false)
      console.log(isValid)
    }
  }, [email, firstName, surname, age, password, secondPassword, error, profilePicture])


  return (
    <div className="login">
      <h1>SignUp</h1>
      <h4>{servResponse.length > 1 ? servResponse : error}</h4>
      <form>
        <input onChange={(event) => setProfilePicture(event.target.files[0])} type="file" placeholder="PP" />
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email" required />
        <input value={firstName} onChange={(event) => setFirstName(event.target.value)}
          type="text"

          placeholder="FirstName"
          required
        />
        <input value={surname} onChange={(event) => setSurname(event.target.value)} type="text" placeholder="Surname" required />
        <input value={age} onChange={(event) => setAge(event.target.value)} type="date" required />
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" required />
        <input value={secondPassword} onChange={(event) => setSecondPassword(event.target.value)}
          type="password"
          placeholder="Verification password"
          required
        />
        <a onClick={() => isValid ? createAcount() : console.log("cpas bon")} type="submit" className="btn btn-primary btn-block btn-large">
          Create new account
        </a>
        <a href="/login" className="btn btn-primary btn-block btn-large">
          Login
        </a>
      </form>
    </div>
  );
};

export default SignUp;
