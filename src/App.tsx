import './App.css';
import React, { useState, useEffect } from "react";
import shapesbg from "./assets/shapes.jpg"; //image from Freepik
import { Scramble } from './server/server';
import Win from './Win';

function App() {
  const [word, setWord] = useState("");
  const [timerKey, setTimerKey] = useState(0); // reinicia o timer
  const [win,setWin] = useState(false);

  const scramble = Scramble.getInstance();
  const cat_atual = scramble.getCurrentGame();

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWord(word.trim());
    if (!word) return;

    const result = scramble.tryWord(word);
    console.log(result);

    if(result.isFinished){
      setWin(true);
    }

    setWord("");
    // reinicia o timer ao enviar a palavra
    setTimerKey(prev => prev + 1);
  }

  function Category({id, cat_atual}){
    const showImage = id <= parseInt(cat_atual);
    return(
      <div id = {id} className="cat_image" style={{
        backgroundImage: showImage ? `url(${shapesbg})` : "none" ,
        backgroundColor: showImage ? "transparent" : "#111"}}>
      {/* {showImage ? cat_atual.categoryName : "? ? ?"} */} {cat_atual.categoryName}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center w-screen h-screen">
        {/* CATEGORIAS */}
        <div id="categories" className="flex flex-nowrap w-full justify-start md:justify-between items-center p-10 gap-4 overflow-x-auto">
            <Category id={1} cat_atual={cat_atual} />
            <Category id={2} cat_atual= '2' />
            <Category id={2} cat_atual="3" />
            <Category id={2} cat_atual={cat_atual} />
            <Category id={2} cat_atual={cat_atual} />
            <Category id={2} cat_atual={cat_atual} />
            <Category id={2} cat_atual={cat_atual} />
            <Category id={2} cat_atual={cat_atual} />
            <Category id={2} cat_atual={cat_atual} />
            <Category id={2} cat_atual={cat_atual} />
            <Category id={2} cat_atual={cat_atual} />
        </div>

        <main className='flex flex-col justify-center items-center w-screen h-screen'>
          <div className="mb-5r flex flex-col items-center">
            <h1 className="title">SCRAMBLE</h1>
          </div>

          <form className="mb-5r flex flex-col w-1/2 items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              id="words"
              value={word}
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
          wordsGuessed={5}
          categoriesReached={3}
          timeBonus={3423}
          score={200000}/>)
        }

      </div>
    </>
  );
}

export default App;