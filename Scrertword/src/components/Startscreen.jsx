import React from 'react'
import './Startscreen.css'
const Startscreen = ({startGame}) => {
  return (
    <div className='App start'>

        <h2>Secret Word</h2>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}> Começar o Jogo</button>


    </div>
  )
}

export default Startscreen