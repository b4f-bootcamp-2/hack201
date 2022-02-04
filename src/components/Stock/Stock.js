import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./stock.module.scss";

export function Stock() {
    const [stock, setStock] = useState({});
    // const [option, setOption] = useState();
    const navigate = useNavigate();

    async function getStock() {
        const stock = await fetch("/stock", {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        const res = await stock.json();
        setStock(res);
    }

    useEffect(() => {
        getStock();
    }, [])

    function percentage(curFood, neededFood){
        if(curFood/neededFood * 100 > 100) return 100
        if(curFood/neededFood * 100 < 0) return 0;
        return curFood/neededFood * 100
    }

    return (
        <div className={styles.containerStock}>
             <h1>Stock</h1>
             <div className={styles.stock}>
                <h2>Materials:</h2>
                <h4>Food {stock.CurrentFood}/{stock.NeededFood} g</h4>
                <div className={styles.progressBar}>
                    <div style={{ width: `${(stock.CurrentFood/stock.NeededFood) * 100}%` }} className={styles.progressBarInt}></div>
                </div>
                <h4>Water {stock.CurrentWater}/{stock.NeededWater} ml</h4>
                <div className={styles.progressBar}>
                    <div style={{ width: `${(stock.CurrentWater/stock.NeededWater) * 100}%` }} className={styles.progressBarInt}></div>
                </div>
                <h4>Medicines {stock.CurrentMedicine}/{stock.NeededMedicines}</h4>
                <div className={styles.progressBar}>
                    <div style={{ width: `${(stock.CurrentMedicine/stock.NeededMedicines) * 100}%` }} className={styles.progressBarInt}></div>
                </div>
                <h4>Savings</h4>
                <div className={styles.total}>{stock.Savings}</div>
                
                <div className={styles.btnContainer}>
                    <button className={styles.btnStock} onClick={()=> navigate("/addstock")}>+</button>
                    <button className={styles.btnStock} onClick={()=> navigate("/removestock")}>-</button>
                </div>

                {/* <select>
                    <option>Select option</option>
                    <option>Donations</option>
                    <option>Campaings</option>
                    <option>Raffles</option>
                </select>

                <select>
                    <option>Select option</option>
                    <option>Vet appointment</option>
                    <option>Food</option>
                    <option>Cleaning expense</option>
                </select> */}
             </div>
            
        </div>
    )
}