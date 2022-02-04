import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";

export function Login({ setMessages }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [eye, setEye] = useState("bi bi-eye-fill")
    const navigate = useNavigate()

    async function login() {
        const res = await fetch(`/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: username,
                password: password
            })
        })

        const resJson = await res.json()
        setMessages(resJson.Message)
        if (resJson.token !== undefined) {
            localStorage.setItem("token", resJson.token)
            navigate('/dashboard')
        }

    }

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "150px" }}>
            <label>
                <p>Username</p>
                <input className={styles.infoLogin} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
            <label>
                <p>Password</p>
                {/* <div style={{ position: "relative" }}> */}
                    <input className={styles.infoLogin} type={eye === "bi bi-eye-fill" ? "password" : "text"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <i style={{ position: "absolute", right: "8px", bottom: "8px" }} className={eye} onClick={() => setEye(eye === "bi bi-eye-fill" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill")}></i>
                {/* </div> */}
            </label>
            <button className={styles.btn} onClick={() => login()}>Login</button>
            <p>First Time?</p>
            <button className={styles.btn} onClick={event => window.location.href = '/signup'}>Signup
            </button>
        </div>
    )
}