import React from 'react'
import './App.css'
import './server/server'


function Win({wordsGuessed, categoriesReached, timeBonus, score}) {

 return (
    <div className='fixed inset-0 bg-[#2b1730]/80 backdrop-blur-sm flex flex-col justify-center items-center'>
    <div className='bg-[#2b1730] flex flex-col justify-center items-center w-[70vw] h-[80vh] rounded-4xl shadow-2xl shadow-white  '>
        <div className='s-title'>CONGRATULATIONS!</div>
        <div className='text-white text-center text-2xl md:text-4xl font-medium p-10'>
            <h1>words guessed: {wordsGuessed}</h1>
            <h1>categories reached: {categoriesReached}</h1>
            <h1>time bonus: {timeBonus}</h1>
        </div>    
        <div className=' py-15 text-7xl font-extrabold text-white'>{score}</div>  
        <button className='button' onClick={() => window.location.reload()}> Try Again </button>
        </div>
    </div>
 )
}

export default Win
