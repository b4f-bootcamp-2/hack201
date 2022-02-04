import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.scss";

export function Signup({ setMessages }) {
  const [eye, setEye] = useState("bi bi-eye-fill");
  const [eyeC, setEyeC] = useState("bi bi-eye-fill");
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    userName: "",
    password: "",
    passwordConfirmation: "",
  });

  async function signup() {
    const res = await fetch(`/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(account),
    });
    const resJson = await res.json();
    setMessages(resJson.Message);
    if (resJson.Message === "Your Account has been created! Please Log in!")
      navigate("/");
  }

  return (
  <div style={{ display: "flex", marginTop: "100px", flexDirection: "column" }}>
          <h2>Register</h2>
          <label>
            <p>Email</p>
            <input
              placeholder="Email"
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
          </label>
          <label>
            <p>Username</p>
            <input
              placeholder="Username"
              value={account.userName}
              onChange={(e) =>
                setAccount({ ...account, userName: e.target.value })
              }
            />
          </label>
          <label>
            <p>Password</p>
            <div style={{ position: "relative" }}>
              <input
                type={eye === "bi bi-eye-fill" ? "password" : "text"}
                placeholder="Password"
                value={account.password}
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
              />
            </div>
          </label>

          <div>
            <p>Confirm Password</p>
            <div style={{ position: "relative" }}>
              <input
                type={eyeC === "bi bi-eye-fill" ? "password" : "text"}
                placeholder="Confirm Password"
                value={account.passwordConfirmation}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    passwordConfirmation: e.target.value,
                  })
                }
              />
              <i
                style={{ position: "absolute", right: "8px", bottom: "8px" }}
                className={eyeC}
                onClick={() =>
                  setEyeC(
                    eyeC === "bi bi-eye-fill"
                      ? "bi bi-eye-slash-fill"
                      : "bi bi-eye-fill"
                  )
                }
              ></i>
            </div>
          </div>
          <br />
          <button className={styles.btn} onClick={() => signup()}>
            Signup
          </button>
          <br />
          <p>Already Registered?</p>
          <button className={styles.btn}
            onClick={(event) => (window.location.href = "/")}
          >
            Login
          </button>
        </div>
        )

}