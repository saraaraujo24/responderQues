import React, { useState } from 'react';
import './styles.css';

import InputMask from 'react-input-mask';
import {useNavigate} from "react-router-dom";

function LoginPage() {

 
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [storedCpf, setStoredCpf] = useState('');
  console.log(storedCpf);


  function isValidCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidCPF(cpf)) {
      const Cpf = cpf.replace(/\D/g, '');
      setStoredCpf(Cpf); 
console.log(Cpf)
    
      navigate(`/pergunta/${Cpf}`);

      
    } else {
      alert('CPF Invalido. Por favor insira um CPF valido.');
    }
  }



  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit} >
            <p className="login-form-title">Bem vindo</p>
            <br></br><br></br>
            <div className="wrap-input">
              <InputMask
                mask="999.999.999-99"
                className={cpf !== '' ? 'has-val input' : 'input'}
                type="CPF"
                placeholder='Informe seu CPF'
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              
              <span  data-placeholder="CPF"></span>
            </div>

            <div className="container-login-form-btn">
            <button type="submit" className="login-form-btn">Entrar</button>
              
            </div>
          </form>       
        </div>    
      </div>  
    </div>
  );
}

export default LoginPage;

 
 

 
