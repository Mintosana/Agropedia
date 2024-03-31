import Login from "./loginComponent/login"
import Register from "./registerComponent/register"

import { useState } from 'react'

export default function LoginPage() {
    const [loginState, setLoginState] = useState(true);

    const toggleLoginState = () => {
        setLoginState(!loginState)
    }

    return (
        <>
            <div>
                <img className="logo" src="logo.png" alt="Company logo" />
                <h1 className="logo logo-text">Agropedia</h1>
            </div>
            {loginState ? <Login loginState={() => toggleLoginState()} /> : <Register loginState={toggleLoginState} />}
        </>
    )

}