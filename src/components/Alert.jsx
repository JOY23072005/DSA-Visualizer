import React, { useEffect, useRef } from 'react'



export default function Alert({alerts,setShowAlerts}) {
  
    const Audio = useRef(null);

    const handleOnClick = ()=>{
        setShowAlerts(false);
    }
    useEffect(()=>{
        Audio.current.currentTime=0.9;
        Audio.current.play();
    })
    return (
    <div className='overlay-alert'>
        <div className="d-flex position-relative bg-light text-dark container justify-content-center align-items-center alert-box">
            <div style={{top:'0'}} className='position-absolute bg-warning d-flex justify-content-end w-100 pe-2'><div onClick={handleOnClick} style={{cursor:'pointer'}}>&#10006;</div></div>
            <p className='alert-text'><img src="/alert.svg" style={{width:'50px'}} /><br/>{alerts}</p>
            <audio className='d-none' ref={Audio} src="/ting.mp3"></audio>
        </div>
    </div>
  )
}
