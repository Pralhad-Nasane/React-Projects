import React, { useState } from 'react';
import './App.css';
import { Board } from './Components/Board'
import { ScoreBoard } from './Components/ScoreBoard';
import { ResetButton } from './Components/ResetButton';

function App() {

  const WIN_CONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlayer, setXPlayer] = useState(true);
  const [scores, setScores] = useState({xScore:0, oScore:0})
  const [gameOver, setGameOver] = useState(false);



  const handleBoxClick = (boxIndex) => {
    const updateBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return xPlayer === true ? "X" : "O";
      } else {
        return value;
      }
    })

    const winner = checkWinner(updateBoard);

    if(winner){
      if(winner === "O"){
        let {oScore} = scores;
        oScore += 1;
        setScores({...scores, oScore})
      } else {
        let {xScore} = scores;
        xScore += 1;
        setScores({...scores, xScore})
      }
    }


    // console.log(scores);
    setBoard(updateBoard);
    setXPlayer(!xPlayer);
  }

  const checkWinner = (board) => {

    for (let index = 0; index < WIN_CONDITION.length; index++) {
      const [x, y, z] = WIN_CONDITION[index];

      if(board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true)
        return board[x];
      }
    }
  }

  const resetBoard = ()=>{
    setGameOver(false)
    setBoard(Array(9).fill(null));
  }



  return (
    <div className="App">
      <ScoreBoard  scores ={scores} xPlayer={xPlayer}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard = {resetBoard}/>
    </div>
  );
}

export default App;
