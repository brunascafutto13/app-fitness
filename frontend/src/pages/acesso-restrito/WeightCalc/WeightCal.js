import React from "react";
import styles from "./WeightCalc.module.css";
import Logo from "../../../assets/Logo.png";
import { useState, useEffect } from "react";
import authService from "../../../services/auth.service";

export default function MainPage() {
  const [peso, setPeso] = useState(null); // Estado para armazenar o peso do usuário
  const userEmail = localStorage.getItem('email'); // Recupera o e-mail do usuário do localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verifica se há um e-mail válido no localStorage antes de buscar o usuário
        if (userEmail) {
          const user = await authService.getUserByEmail(userEmail); // Busca o usuário pelo e-mail
          if (user) {
            setPeso(user.peso); // Atualiza o estado com o peso do usuário
          } else {
            console.log('Usuário não encontrado');
          }
        } else {
          console.log('E-mail não encontrado no localStorage');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUserData(); // Chama a função para buscar os dados do usuário quando o componente montar
  }, [userEmail]);
  
 
  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lógica para lidar com o envio do formulário
  };

  return (
    <div className={styles.body}>
      <img src={Logo} className={styles.Logo} alt="logo" />
      <form onSubmit={handleSubmit} className={styles.container}>
        <p className={styles.esqueci}>Seu peso atual é: {peso} deseja altera-lo? </p>
        <div className={styles.wrapperInput}>
          <input className={styles.input} type="number" placeholder="Novo peso (Kg)" />
        </div>
        <button type="submit" className={styles.button}>Calcular</button>
      </form>
    </div>
  );
}
