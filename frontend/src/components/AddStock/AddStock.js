import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./addStock.module.scss";

export function AddStock({ setMessages }) {
    const [type, setType] = useState({});
    const navigate = useNavigate()


    async function onSubmit(){
        console.log(type.type==="Water", type.value)
        const add = await fetch("/addstock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(type)
        })
        const res = await add.json()
        setMessages(res.Message)
        if(res.Message === "Successful update!") navigate("/stock");
    }

    return (
        <div>
            <h1 className={styles.add}>Add To Stock</h1>
            <div style={{marginLeft: "400px"}}  className={styles.removeFromStock}>
            <select onChange={(e)=>setType({...type, type: e.target.value})} className={styles.info}>
                <option>Select option</option>
                <option>Donations</option>
                <option>Campaigns</option>
                <option>Raffles</option>
                <option>Water</option>
                <option>Food</option>
                <option>Medicine</option>
            </select>
            <label>
                <input type="number" className={styles.info} placeholder="please insert a number" onChange={(e)=> setType({...type, value: e.target.value})}>
                </input>
            </label>
            <button className={styles.btnAdd} onClick={()=> onSubmit()}>Submit</button>
            </div>
        </div>
       
    )
}