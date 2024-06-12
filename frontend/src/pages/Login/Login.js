import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import styles from "./Login.module.css";
import Logo from "../../assets/Logo.png";
import authService from "../../services/auth.service"; // Importe o serviço de autenticação
import { Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate(); // Obter a função navigate

  const logar = async (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await authService.login(email, password);
      console.log(response.data);
      alert('Successfully logged in!');
      navigate('/main'); // Redirecionar para main
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid email or password!');
    }
  };

  return (
    <div className={styles.body}>
      <img src={Logo} className={styles.Logo} alt="Logo" />
      <form id="login" className={styles.container} onSubmit={logar}>
        <p className={styles.esqueci}>Login</p>
        <div className={styles.wrapperInput}>
          <input className={styles.input} type="email" id="email" placeholder="Email" />
          <input className={styles.input} type="password" id="password" placeholder="Senha" />
        </div>
        <button type="submit" className={styles.button}>Entrar</button>
        <div> Não possui cadastro? <Link to="/register"> Clique aqui </Link> </div>
      </form>
    </div>
  );
}

export default Login;
