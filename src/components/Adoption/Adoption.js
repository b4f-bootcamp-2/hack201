import React, { useEffect, useState } from "react";
import styles from "./adoption.module.scss";
import gatoAlexandre from "../../imagens/gatoAlexandre.jpg";

export function Adoption() {
    const [cat, setCats] = useState([]);

    async function getCats() {
        const cats = await fetch("/cattery",{
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        const resJson = await cats.json()
        setCats(resJson)
    }

    useEffect(() => {
        getCats();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.fixAside}></div>
            <div className={styles.fixAsideRight}>
            <h1 className={styles.title}>Adoption Board</h1>
            <div className={styles.adoption}>
                {cat.map((cat, i) => <div key={i} className={styles.catBoard}>
                    <img 
                        src={gatoAlexandre} 
                        className={styles.gatoAlexandre}    
                    />
                    <div className={styles.info}>
                        <h4 className={styles.name}>{cat.name}</h4>
                        <h4 className={styles.age}>Estimated age: {cat.approximateAge}</h4>
                    </div>
                </div>)}
            </div>
            </div>

        </div>
        
    )
}