//useState
import { useState,useCallback,useEffect } from 'react'
//css
import './App.css'
//data
import { wordlist } from './data/words'

import Startscreen from './components/Startscreen'
import Gameover from './components/Gameover'
import Game from './components/Game'


const stages =[
    {id:1, name:"Start"},
    {id:2, name:"Game"},
    {id:3, name:"End"}
]

const guessesQty = 3

function App() {

  const [gamestage,setgamestage] = useState(stages[0].name)
  const [words] = useState(wordlist)

  const [pickedWord,setpickedWord] = useState("")
  const [pickedCategory,setpickedCategory] = useState("")
  const [letters,setletters] =useState([])


  const [guessedLetters,setGuesseLetters] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(guessesQty)
  const [score,setScore] =useState(100)

 

const pickedAndCategoria = useCallback(() =>{
  // pick a redom categori
    const catrgories = Object.keys(words);
    const category = 
    catrgories[Math.floor(Math.random() * Object.keys(catrgories).length)];


    console.log(category);

    //rendom palavras
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word);
    return { word,category};
}, [words])


  //start pages
  const startGame = useCallback(()=>{
    clearLettersStates()
      const {word,category} = pickedAndCategoria();
      console.log(word,category);

    //array de letras
    let wordlettrs = word.split("");

    wordlettrs = wordlettrs.map((l) => l.toLowerCase());
    console.log(word,category);
    console.log(wordlettrs);

    // filter states
    setletters(wordlettrs);
    setpickedCategory(category);
    setpickedWord(word); 


    setgamestage(stages[1].name)
  }, [pickedAndCategoria])



  //process the latter input
  const verifyletter = (letter) =>{
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuesseLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
 };

 const clearLettersStates = () =>{
    setGuesseLetters([]);
    setWrongLetters([]);
 }

 useEffect(() => {
  if (guesses <= 0) {

    setgamestage(stages[2].name) // quando zerar o numero de tentativas, encaminhar para o gamerover
  }

},[guesses]) //monitoramento



useEffect(() =>{
  const uniqueLetters = [... new Set(letters)]
  
    //condição de vitoria
    
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100))
      
      startGame()
    }

}, [guessedLetters, startGame,letters])

  //reniciar jogo

  const retry = () =>{
    setScore(0)
    setGuesses(guessesQty)
    setgamestage(stages[0].name)
  }

  return (
    <>
     {gamestage === "Start" && <Startscreen startGame={startGame}/>}
     {gamestage === "Game" && <Game verifyletter={verifyletter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
     {gamestage === "End" && <Gameover retry={retry} score={score}/>}
    </>
  )
}

export default App
