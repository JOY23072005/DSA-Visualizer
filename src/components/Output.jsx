import React,{useRef, useEffect} from 'react'

import { swapBars } from '../Algo/utility'
import { insertionSort } from '../Algo/insertionSort'
import { merge,mergeSort } from '../Algo/mergeSort';
import { quickSort,Partition } from '../Algo/quickSort';
import { heapify,heapSort } from '../Algo/heapSort'

export default function Output({setShowAlerts,setAlerts, array, Algo, setarray}) {
  
  const min = Math.min(...array);
  const max = Math.max(...array);
  const width = array.length

  const getHeight = (value) => {
    let containerHeight = (visualArr.current?.clientHeight-50) || 300; // fallback

    if (typeof value === 'string') {
      value = value.charCodeAt(0);
    }

    if (typeof value === 'number') {
      const range = max - min || 1;
      return ((value - min) / range) * (containerHeight - 10) + 10; // dynamic scaling
    }

    return 10;
  };



  const visualArr = useRef(null)
  const hasRun = useRef(false);
  const fullScreen= useRef(false);

  useEffect(() => {
    const runSort = async () => {
      if (hasRun.current) return;
      hasRun.current = true;
      if (Algo === 'Insertion') {
        const totalComp = await insertionSort(visualArr, swapBars, array, setarray);
        setAlerts(`Total Comparisons: ${totalComp}`);
        setShowAlerts(true);
      }
      if (Algo === 'Merge') {
        const countObj = { count: 0 };
        await mergeSort(visualArr, array, 0, array.length - 1, setarray, swapBars, countObj);
        setAlerts(`Total Comparisons: ${countObj.count}`);
        setShowAlerts(true);
      }
      if (Algo === 'Quick'){
        const countObj = { count: 0 };
        await quickSort(visualArr, array, setarray, 0, array.length - 1, countObj, swapBars);
        setAlerts(`Total Comparisons: ${countObj.count}`);
        setShowAlerts(true);
      }
      if (Algo === 'Heap'){
        const countObj = { count: 0 };
        await heapSort(visualArr, array, setarray, swapBars , countObj);
        setAlerts(`Total Comparisons: ${countObj.count}`);
        setShowAlerts(true);
      }
    };
  
    runSort();
  }, [Algo]);
  
function makeFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari & Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
}

const handleOnClick = () => {
  const fullscreenDiv = fullScreen.current;

  if (!document.fullscreenElement) {
    makeFullscreen(fullscreenDiv);
    visualArr.current.style.height = '95vh';
    visualArr.current.style.width = '100vw';
  } else {
    document.exitFullscreen();
    visualArr.current.style.height = '50vh'; // Reset to original
    visualArr.current.style.width = '';      // Let CSS handle it again
  }
};

useEffect(() => {
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      // Exited fullscreen: reset styles
      visualArr.current.style.height = '50vh';
      visualArr.current.style.width = '';
    } else {
      // Entered fullscreen: apply fullscreen styles
      visualArr.current.style.height = '95vh';
      visualArr.current.style.width = '100vw';
    }
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  
  return () => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  };
}, []);

  return (
    <div ref={fullScreen} className='container-fluid mt-2'><p style ={{height:'100px'}} >[ {
      array.join(', ')
    }
    &nbsp;]</p>
      <div ref={visualArr} style={{transform: 'rotate(180deg) scaleX(-1)',}} className="pop-container bg-light text-dark">
          {array.map((element,index)=>
          <div 
          key={index} className="bar" 
          style={{
            marginLeft:'5px',
            backgroundColor:"lightblue",
            height: `${getHeight(element)}px`,
            width:`${Math.max(5, Math.floor(1000 / width))}px`,
            flexGrow: 1,
          minWidth: '4px' }}>
          </div>
          )} 
      </div> 
      {/* <button className="btn btn-primary" onClick={()=>swap(0,1)}>click Me!</button> */}
      <svg onClick={handleOnClick} style={{position:'absolute',right:'10px',bottom:'10px',cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"/>
      </svg>
    </div>
  )
}
