import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ loginState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  }

  const handleClick = async () => {
    const data = {
      email: email,
      password: password,
    }

    if (!email || !password) {
      alert("Unul dintre campuri nu este completat!");
    }
    else {
      const responsePromise = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const consumedResponse = await responsePromise.json();
        
        
        localStorage.setItem("userId",consumedResponse.id);
        localStorage.setItem("token",consumedResponse.token);
        localStorage.setItem("type",consumedResponse.type);


      if (responsePromise.ok) {
        navigate(`/homepage`);
      }
      else {
        const consumedResponse = await  responsePromise.json()
        alert(consumedResponse.message);
      }
    }

  }


  return (
    <div className="inputContainer">
      <h2>Autentificare</h2>
      <input
        className="input"
        placeholder="Introduceti emailul"
        value={email}
        onChange={handleInputEmail}
      ></input>
      <input
        className="input"
        type="password"
        placeholder="introduceti Parola"
        value={password}
        onChange={handleInputPassword}
      ></input>
      <button className="butonLogin" onClick={handleClick}>Autentifica-te</button>
      <button className="butonLogin" onClick={() => loginState()}>Nu ai cont?</button>
    </div>
  );
}
