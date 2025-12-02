import './App.css';
import React, { useState, useEffect } from "react";
import shapesbg from "./assets/shapes.jpg"; //image from Freepik
import { GuessType, Scramble, type Game } from './server/server';
import Win from './Win';
import confetti from 'canvas-confetti'

function App() {
  const [word, setWord] = useState("");
  const [win, setWin] = useState(false);

  const scramble = Scramble.getInstance();
  let gameState = scramble.getCurrentGameState();
  const categoriesList = scramble.getCategories();
  let isTextDisabled = false;

  // === BARRA DE CONTAGEM REGRESSIVA (DENTRO DO APP) ===
  function ProgressBar() {
    const totalBars = gameState.maxRightGuessesPerCategory;
    const filledBars = gameState.rightGuessesCount;

    return (
      <div className="flex justify-between items-center w-full py-2">
        {Array.from({ length: totalBars }).map((_, i) => (
          <div
            key={i}
            className={`h-4 w-100 rounded-sm transition-colors
              ${i < filledBars ? "bg-green-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    );
  }
  // =====================================================

  useEffect(() => {
    if (!win) return;
  
    const timer = setTimeout(() => {
      confetti({ particleCount: 200, angle: 60, spread: 55, origin: { x: 0 }, ticks:100});
      confetti({ particleCount: 200, angle: 120, spread: 55, origin: { x: 1 }, ticks:100 });
    }, 100);
  
    return () => clearTimeout(timer);
  }, [win]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWord(word.trim());
    if (!word) return;

    const result = scramble.tryWord(word);
    gameState = scramble.getCurrentGameState();


    if (result.isFinished && gameState.currentCategory.index == gameState.maxCategoryCount) {
      isTextDisabled = true;
      setWin(true);
    }else if (result.type == GuessType.RIGHT) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        ticks: 50
      });
    }

    setWord("");
  }

  function Category({ id, gameState }: {
    id: number;
    gameState: Game;
}) {
    const showImage = id <= gameState.currentCategory.index;
    return (
      <div id={`category_${id}`} className="cat_image" style={{
        backgroundImage: showImage ? `url(${shapesbg})` : "none",
        backgroundColor: showImage ? "transparent" : "#111"
      }}>
        {showImage ? categoriesList[id] : "???"}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center w-screen h-screen">
        {/* CATEGORIAS */}
        <div id="categories" className="flex flex-nowrap w-full justify-start md:justify-between items-center p-10 gap-4 overflow-x-auto">
          { categoriesList.map((_, index) => {
            return <Category id={index} gameState={gameState} />
          }) }
        </div>

        <main className='flex flex-col justify-center items-center w-screen h-screen'>
          <div className="mb-5r flex flex-col items-center">
            <h1 className="title">SCRAMBLE</h1>
          </div>

          <form className="mb-5r flex flex-col w-1/2 items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              id="words"
              autoComplete="off"
              value={word}
              disabled={isTextDisabled}
              onChange={(e) => setWord(e.target.value)}
              className="md:w-full h-20 p-5 bg-[#e6f3ea] text-[#111] text-m rounded-full hover:border-4 hover:border-[#09e06f]"
              placeholder="Insert words!"
            />
          </form>

          <button type="button" onClick={()=>{setWin(true)}} className="button-submit">Give Up</button>
          {/* BARRA DE TEMPO */}
          <div className="w-1/2 mt-5">
            <ProgressBar />
          </div>
        </main>

        {win && (<Win
          wordsGuessed={gameState.maxRightGuessesPerCategory * gameState.maxCategoryCount}
          categoriesReached={gameState.maxCategoryCount}
          score={gameState.score} />)
        }

      </div>
    </>
  );
}

export default App;