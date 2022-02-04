import { Link } from "react-router-dom";
import logo from "../../imagens/logo.png";
import registration from "../../imagens/9.png";
import adoption from "../../imagens/7.png";
import stock from "../../imagens/stock.png";
import logout from "../../imagens/logout.png";
import perfil from "../../imagens/5.png";

import styles from "./aside.module.scss";

export function Aside() {
  return (
    <div className={styles.asideContent}>
      <div className={styles.logoGato}>
        <Link to="/dashboard"><img src={logo} style={{ height:"130px" }} className={styles.logoLight} /></Link>
      </div>
      <div className={styles.icons}>
        <div>
          <Link to="/stock"><img src={stock} style={{ height:"50px" }} className={styles.stockIcon}/></Link>
        </div>
        <div>
          <Link to="/registration"><img src={registration} style={{ height:"130px" }} /></Link>
        </div>
        <div>
          <Link to="/adoption"><img src={adoption} style={{ height:"130px" }} /></Link>
        </div>
        <div>
          <Link  to="/"><img src={logout}  className={styles.logoutIcon}/></Link>
        </div>
      </div>
    </div>
  );
}
