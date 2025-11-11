// import React, { useState } from "react";
import "./App.css";

function App() {
  // const [word, setWord] = useState("");

  // function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!word.trim()) return;
  //   // inserir lógica ao submeter a palavra (validar, contar, pontuar)
  //   console.log("submit:", word);
  //   setWord("");
  // }

  return (
    <>
      <form className="flex flex-col items-center w-screen h-screen">

        <div id="categories" className="flex flex-nowrap justify-between items-center m-10 overflow-auto no-scrollbar">    
           {/*TODO responsividade das categorias em telas menores  */}

            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div> 
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div> 
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div>             
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div> 
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div> 
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div>             
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div> 
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div> 
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div>             
            <div className="cat_image" style={{backgroundImage: "url('./src/assets/hkty.jpeg')"}}>categoria 1 </div> 
        </div>
        
        <div className='flex flex-col justify-center items-center w-screen'>
          
          <div className="mb-5r flex flex-col items-center border-2 border-amber-300">
            <p className="md:basis-2/5 max-w h-20 p-5 md:text-9xl text-7xl">SCRAMBLE</p>  
          </div> {/* usar imagem para a logo? */}

          <div className="mb-5r flex flex-col w-1/2 items-center border-2 border-amber-300">
            <input type="text" id="words" className="md:w-full h-20 p-5 bg-amber-200 text-pink-500 text-m rounded-full hover:border-4 hover:border-amber-600" 
            placeholder="Digite suas palavras!"/>
            <button className='self-end bg-[rgb(233,122,111)] px-15 py-2 m-10 rounded-3xl shadow-md hover:bg-[rgb(233,122,255)] '>SEND</button>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center w-screen'>
          <div className='w-1/2 p-2.5 bg-transparent rounded-3xl border-4 border-amber-500'></div>
        </div>
    </form>
    </>
  )
}

export default App;