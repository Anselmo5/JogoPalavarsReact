import React from 'react'
import './Gameover.css'

const Gameover = ({retry,score}) => {
  return (
    <div className='App'>
      <h2>Fim do Jogo</h2>
        <h3>Sua Pontuação: <span>{score}</span></h3>
        <button onClick={retry}>Reiniciar</button>
     </div>
  )
}

export default Gameover