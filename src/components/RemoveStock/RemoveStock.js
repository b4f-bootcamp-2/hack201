import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./removeStock.module.scss";

export function RemoveStock({ setMessages }) {
    const [type, setType] = useState({});
    const navigate = useNavigate()


    async function onSubmit(){
        console.log(type.type==="Water", type.value)
        const remove = await fetch("/removestock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(type)
        })
        const res = await remove.json()
        setMessages(res.Message)
        if(res.Message === "Successful update!") navigate("/stock");
    }

    return (
        <div>
            <h1 className={styles.remove}>Remove from Stock</h1>
            <div style={{marginLeft: "400px"}} className={styles.removeFromStock}>
            <select onChange={(e)=>setType({...type, type: e.target.value})} className={styles.info}>
                    <option>Select option</option>
                    <option>Vet appointment</option>
                    <option>Cleaning expense</option>
                    <option>Establishemnt Management</option>
                    <option>Water</option>
                    <option>Food</option>
                    <option>Medicine</option>
            </select>
            <label>
                <input type="number" className={styles.info} placeholder="please insert a number" onChange={(e)=> setType({...type, value: e.target.value})}>
                </input>
            </label>
            <button className={styles.btnRemove} onClick={()=> onSubmit()}>Submit</button>
        </div>
        </div>
        
    )
}