import React, { useState } from 'react';
import styles from "./registration.module.scss";
import gatoAlexandre from "../../imagens/gatoAlexandre.jpg";

export function Registration({ setMessages }) {
   const [registration, setRegistration] = useState({
      name: "",
      weight: 0,
      approximateAge: 0,
      color: "",
      breed: "",
      //terms: false
   });

   const onHandleChange = (e) => {
      let value;
      if (e.target.type === "checkbox") {
         value = e.target.checked;
      } else {
         value = e.target.value;
      }
      setRegistration({ ...registration, [e.target.name]: value });
   }

   const onSubmit = async (e) => {
      e.preventDefault();

    const catRegistration = await fetch("/catregistration", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
        body: JSON.stringify(registration),
    });
        const resJson = await catRegistration.json();
        setMessages(resJson.Message)
   };

    return (
       <div className={styles.container}>
         <form onSubmit={onSubmit}>
                  <h1>Registration</h1>
                  <img 
                     src={gatoAlexandre} 
                     className={styles.register}
                  />
                     <div>
                        <input 
                           type="text"
                           value={registration.name}
                           name="name"
                           placeholder="Name" 
                           onChange={(e) => {onHandleChange(e)}}
                           className={styles.form}
                        /> 
                     </div>
                     <div>
                        <input 
                           type="number" 
                           name="weight"
                           placeholder="Weight(kg)" 
                           onChange={(e) => {onHandleChange(e)}}
                           className={styles.form}
                        />  
                     </div>
                     <div>
                        <input 
                           type="number" 
                           name="approximateAge"
                           placeholder="Approximate Age" 
                           onChange={(e) => {onHandleChange(e)}}
                           className={styles.form}
                        />  
                     </div>
                     <div>
                        <input 
                           type="text" 
                           name="color"
                           placeholder="Color" 
                           onChange={(e) => {onHandleChange(e)}}
                           className={styles.form}
                        />  
                     </div>
                     <div>
                        <input 
                           type="text" 
                           name="breed"
                           placeholder="Breed" 
                           onChange={(e) => {onHandleChange(e)}}
                           className={styles.form}
                        />  
                     </div>

                     <label className={`${styles.switch} ${styles.switchPlace}`}>
                     <span className={`${styles.slider} ${styles.round}`}></span>
                     </label>
                     <div>
                        <input 
                        type="submit" 
                        value="Send"
                        className={styles.btn}
                     />
                     </div>
               </form>
       </div>
        

    )
}