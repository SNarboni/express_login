import { useEffect, useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";


const Login = ({ check }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [servResponse, setServResponse] = useState("")
  const history = useHistory()

  const login = () => {
    setServResponse("")
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      return response.json();
    }).then((response) => {
      setServResponse(response)
      localStorage.setItem('token', response.token);
      check()
      if (response.message === "utilisateur reconnu") {
        let path = `/welcome`;
        history.push(path);
      }
    }).catch((error) => {
      console.log(error);
    });

  };


  useEffect(() => {
    setIsValid(false)
    let verifEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    if (verifEmail && password.length >= 8) {
      setIsValid(true)
      console.log(isValid)
    } else {
      setIsValid(false)
      console.log(isValid)
    }
  }, [email, password, isValid])


  return (
    <div className="login">
      <h1>Login</h1>
      <h4>{servResponse.message}</h4>
      <div>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
          required="required"
        />
        <input
          name="password"
          type="password"
          value={password}
          minLength="8"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
          required="required"
        />
        <button
          onClick={() => isValid ? login() : console.log("cpas bon")}
          className="btn btn-primary btn-block btn-large"
        >
          Connect
        </button >
        <a href="/signUp" className="btn btn-primary btn-block btn-large">
          SignUp
        </a>

      </div>
    </div>
  );
};

export default Login;
