import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.scss";
import paco from "../../imagens/paco.jpg";
import leon from "../../imagens/leon.jpg";

export function Dashboard(){
	const navigate = useNavigate();
	useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) navigate("/");
  }, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.titleDash}>Dashboard</h1>
			<div className={styles.containerBoard}>
				<div className={styles.catBoard}>
					<h3>Last adoption</h3>
					<img 
						src={paco} 
						className={styles.paco}
					/>
					<h5>Paco</h5>
				</div>
			</div>
			
			<div className={styles.catBoard}>
				<h3>Last addition</h3>
				<img 
					src={leon} 
					className={styles.paco}
				/>
				<h5>Leon</h5>
			</div>
		</div>
	)
}