import React, { useEffect, useState } from 'react';
import '../App.css'; // Importe seu CSS

const Disclaimer = () => {
  const [visible, setVisible] = useState(true); // Estado para controlar a visibilidade

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible((prevVisible) => !prevVisible); // Alterna a visibilidade a cada 5 segundos
    }, 5000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`disclaimerXicaras ${visible ? 'fade-in' : 'fade-out'}`}>
      <p>Mensagem 1</p>
      <p>Mensagem 2</p>
    </div>
  );
};

export default Disclaimer;
