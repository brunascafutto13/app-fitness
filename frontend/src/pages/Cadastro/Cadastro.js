import React, { useState } from 'react';
import styles from "./Cadastro.module.css";
import Logo from "../../assets/Logo.png";
import authService from "../../services/auth.service"; // Importe o serviço de autenticação
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [peso, setPeso] = useState('');
  const navigate = useNavigate()
  
  const handleRegister = async (event) => {
    event.preventDefault();
    
    // Verificar se as senhas correspondem
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await authService.register(username, email, password, peso);
      console.log(response.data);
      
      if (response.status === 201) {
        alert("Successfully registered!");
        navigate('/main');
      } else {
        alert(response.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.body}>
      <img src={Logo} className={styles.Logo} alt="Logo" />
      <form onSubmit={handleRegister} className={styles.container}>
        <p className={styles.esqueci}>Cadastro</p>
        <div className={styles.wrapperInput}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Peso (Kg)"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Repetir Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
