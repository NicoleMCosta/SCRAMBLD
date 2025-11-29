import './App.css';
import React, { useState, useEffect } from "react";
import shapesbg from "./assets/shapes.jpg"; //image from Freepik
import { GuessType, Scramble } from './server/server';
import Win from './Win';
import confetti from 'canvas-confetti'

function App() {
  const [word, setWord] = useState("");
  const [timerKey, setTimerKey] = useState(0); // reinicia o timer
  const [win, setWin] = useState(false);

  const scramble = Scramble.getInstance();
  let gameState = scramble.getCurrentGameState();
  const categoriesList = scramble.getCategories();
  let isTextDisabled = false;

  // === BARRA DE CONTAGEM REGRESSIVA (DENTRO DO APP) ===
  function TimeBar({ duration }: { duration: number }) {
    const [percent, setPercent] = useState(100);

    useEffect(() => {
      let start = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        const progress = ((duration - elapsed) / duration) * 100;
        setPercent(progress > 0 ? progress : 0);
      }, 100);

      return () => clearInterval(interval);
    }, [duration]);

    return (
      <div className="timebar-container">
        <div className="timebar-fill" style={{ width: `${percent}%` }}></div>
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
    // reinicia o timer ao enviar a palavra
    setTimerKey(prev => prev + 1);
  }

  function Category({ id, gameState }) {
    const showImage = id <= parseInt(gameState.currentCategory.index);
    return (
      <div id={id} className="cat_image" style={{
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
              placeholder="Digite suas palavras!"
            />

            <button type="submit" className="button-submit">GO</button>
          </form>

          {/* BARRA DE TEMPO */}
          <div className="w-1/2 mt-5">
            <TimeBar key={timerKey} duration={20} />
          </div>
        </main>

        {win && (<Win
          wordsGuessed={gameState.maxRightGuessesPerCategory * gameState.maxCategoryCount}
          categoriesReached={gameState.maxCategoryCount}
          timeBonus={3423}
          score={gameState.score} />)
        }

      </div>
    </>
  );
}

export default App;