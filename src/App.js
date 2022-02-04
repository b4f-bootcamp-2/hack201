import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Aside } from "./components/Aside/Aside";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { Stock } from "./components/Stock/Stock";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Adoption } from "./components/Adoption/Adoption";
import { Registration } from "./components/Registration/Registration";
import { AddStock } from "./components/AddStock/AddStock";
import { RemoveStock } from './components/RemoveStock/RemoveStock';
import style from "./app.module.scss";


function App() {
  const [ message, setMessages ] = useState("");

  return (
    <div className={style.container}>
      <Notification setMessages={setMessages} message={message} />
      <div className={style.aside}>
        {localStorage.getItem("token") && <Aside />}
      </div>
      <div className={style.content}>
         <Routes>
          <Route exact path="/" element={<Login setMessages={setMessages} />} />
          <Route path="/registration" element={<Registration setMessages={setMessages} />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/signup" element={<Signup setMessages={setMessages} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addstock" element={<AddStock setMessages={setMessages} />} />
          <Route path="/removestock" element={<RemoveStock setMessages={setMessages} />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;

function Notification({ message, setMessages }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const id = setTimeout(() => {
      setVisible(false);
      setMessages(undefined);
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, [message]);
  return (
    <div
      className={[style.notification]
        .concat(visible ? [style.visible] : [])
        .join(" ")}
    >
      {message}
    </div>
  );
}
