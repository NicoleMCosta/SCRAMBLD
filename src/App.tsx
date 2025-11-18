import './App.css';
import React, { useState, useEffect } from "react";
import hkty from "./assets/hkty.jpeg";
import { Scramble } from './server/server';

function App() {
  const [word, setWord] = useState("");
  const [timerKey, setTimerKey] = useState(0); // reinicia o timer

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

    setWord("");

    // reinicia o timer ao enviar a palavra
    setTimerKey(prev => prev + 1);
  }

  return (
    <>
      <div className="flex flex-col items-center w-screen h-screen">

        {/* CATEGORIAS */}
        <div id="categories"
          className="flex flex-nowrap w-full justify-start md:justify-between items-center p-15 gap-2 overflow-auto no-scrollbar bg-transparent">
          
          <div className="cat_image" style={{ backgroundImage: `url(${hkty})` }}>
            {cat_atual.categoryName}
          </div>

          <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 2</div>
          <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 3</div>
          <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 4</div>
        </div>

        <main className='flex flex-col justify-center items-center w-screen'>
          
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
      </div>
    </>
  );
}

export default App;