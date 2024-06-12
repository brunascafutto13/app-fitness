import styles from "./WeightCalc.module.css";
import Logo from "../../../assets/Logo.png";

export default function MainPage() {

  return (
    <div className={styles.body}>
    <img src={Logo} className={styles.Logo} alt ="logo" />
      <form  className={styles.container}>
        
          <p className={styles.esqueci}>Inserir Peso</p>
        <div className={styles.wrapperInput}>
          <input className={styles.input}type="number" placeholder="Peso (Kg)" />
        </div>

        <button type="submit" className={styles.button}>Calcular</button>
      </form>

    </div>
  );
}