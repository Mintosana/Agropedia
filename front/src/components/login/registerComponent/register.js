import './register.css'
import { useState } from 'react';

export default function Register({ loginState }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    // const [location,setLocation] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Client");

    const handleClick = async () => {
        console.log(`${username} ${email} ${type} ${password}`);
        if(!username || !email || !type || !password || !phoneNumber){
            alert("Unul dintre campuri nu este completat!");
        }
        else if(username.length < 3){
            alert("Numele este prea mic");
        }
        else if(/^[0-9]+$/.test(username)){
            alert("Numele trebuie sa contina doar caractere")
        }
        else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            alert("Emailul furnizat nu este corect");
        }
        else if(phoneNumber.length !== 10){
            alert("Numarul de telefon nu are lungimea potrivita");
        }
        else if(/^([^0-9]*)$/.test(phoneNumber)){
            alert("Numarul de telefon trebuie sa contina doar numere");
        }
        else{
            const data = {
                name: username,
                email: email,
                phoneNumber: phoneNumber,
                location: "Cilieni",
                password: password,
                type: type,
            }
            const responsePromise = await fetch(`${process.env.REACT_APP_LOCALHOST_BACK}/api/user/register`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            if (responsePromise.ok) {
                alert("Utilizator inregistrat!")
                loginState();
            }
            else {
                const consumedResponse = await responsePromise.json()
                alert(consumedResponse.message);
            }
            
        }
    }

    const handleInputUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleInputEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleInputPhoneNumber = (event) =>{
        setPhoneNumber(event.target.value);
    };
    const handleInputPassword = (event) => {
        setPassword(event.target.value);
    };
    const handleInputType = (event) => {
        setType(event.target.value);
    };

    return (
        <div className="inputContainer">
            <h2>Inregistrare</h2>
            <input
                className="input"
                placeholder="Introduceti numele"
                value={username}
                onChange={handleInputUsername}
            ></input>
            <input
                className="input"
                placeholder="Introduceti email-ul"
                value={email}
                onChange={handleInputEmail}
            ></input>
             <input
                className="input"
                placeholder="Introduceti numarul de telefon"
                value={phoneNumber}
                onChange={handleInputPhoneNumber}
            ></input>
            <input
                className="input"
                type="password"
                placeholder="introduceti Parola"
                value={password}
                onChange={handleInputPassword}
            ></input>
            <label className = 'userTypeLabel'> Tipul utilizatorului:
            <select className='userTypeSelect' onChange={handleInputType}>
                <option value="Client">Client</option>
                <option value="Producator">Producator</option>
                {/* <option value="Firma">Firma/Contractor</option> */}
            </select>
            </label>
            <button className="butonRegister" onClick={handleClick}>Inregistreaza-te</button>
        </div>
    );
}