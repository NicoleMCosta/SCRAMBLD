import './App.css'
import React, { useEffect, useState } from "react";
import "./App.css";
import hkty from "./assets/hkty.jpeg";

function App() {
  const [word, setWord] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!word.trim()) return;
    // inserir lógica ao submeter a palavra (validar, contar, pontuar)
    console.log("submit:", word);
    setWord("");
  }

  return (
    <>
      <div className="flex flex-col items-center w-screen h-screen">
        <header>
  
        </header>
        <div id="categories" className="flex flex-nowrap w-full justify-start md:justify-between items-center p-15 gap-2 overflow-auto no-scrollbar bg-transparent">    
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 1 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 2 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 3 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 4 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 5 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 6 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 7 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 8 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 9 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 10 </div> 
              <div className="cat_image" style={{ backgroundImage: `url(${hkty})`}}>categoria 11</div> 
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
            aria-label="Digite suas palavras"
          />

          <button type="submit" className="button-submit">
            GO
          </button>
          
        </form>
        
      </main>

      <div className='flex flex-col justify-center items-center w-screen border-4 border-amber-500'>
        <div className='w-1/2 p-2.5  bg-transparent rounded-3xl border-4 border-amber-500'></div>
      </div>

    </div>
    </>
  )
}

export default App;