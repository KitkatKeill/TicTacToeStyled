import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "../helper.js"

const Game = () => {
   const [history, setHistory] = useState([Array(9).fill(null)]);
   const [stepNumber, setStepNumber] = useState(0);
   const [xIsNext, setXisNext] = useState(true);
   const winner = calculateWinner(history[stepNumber]);
   const x0 = xIsNext ? "X" : "0";

   const handleClick = (i) => {
      const historyPoint = history.slice(0, stepNumber + 1);
      const current = historyPoint[stepNumber];
      const squares = [...current];
      //return if won or occupied
      if (winner || squares[i]) return;
      // select square
      squares[i] = x0;
      setHistory([...historyPoint, squares]);
      setStepNumber(historyPoint.length);
      setXisNext(!xIsNext);
   };


   const jumpTo = (step) => {
      setStepNumber(step)
      setXisNext(step % 2 === 0);
   };

   const renderMoves = () => 
   history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
         <li key={move}>
            <button onClick={() => jumpTo(move)}>{destination}</button>
         </li>
      );
   });

   return (
      <>
      <h1>React Tic Tac Toe - With Hooks</h1>
      <h3>X Goes First</h3>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
      {winner && (
            <>
            <p>{winner} is the winner!</p>
            <button onClick = {() => {
               setHistory([Array(9).fill(null)]);
               setStepNumber(0);
               setXisNext(true);
            }}
               >Play Again</button>
            </>
         )}
      </div>
    </>
   );
};

export default Game;
