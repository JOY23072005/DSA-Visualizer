import React,{ useState,useRef, useEffect} from 'react'
import { generateRandomArray } from '../Algo/utility'
import { insertionSort } from '../Algo/insertionSort'
import { quickSort,Partition } from '../Algo/quickSort'
import { merge,mergeSort } from '../Algo/mergeSort'
import { heapSort,heapify } from '../Algo/heapSort'
import { swapBars } from '../Algo/utility'

export default function Input({setShowAlerts,setAlerts,setArray, setShowOutput, setAlgo}) {
  const [Text,setText]=useState('')
  const [isDisabled,setDisabled]=useState(true)


  const selected = useRef(null);
  const difficulty = useRef(null);
  const genBtn = useRef(null);

  const handleOnChange=(e)=>{
    setText(e.target.value);
  }
  const handleOnClick=()=>{
    try{
    if(selected.current.value!=="0"){
      const newArray = Text.split(',').map(item => {
        const trimmed = item.trim();
        const num = parseFloat(trimmed);
        return isNaN(num) ? trimmed : num;
      });
      setArray(newArray);
      setShowOutput(true);
      setAlgo(selected.current.value)
      selected.current.disabled=true;
      selected.current.style.backgroundColor='rgb(150,150,150)';
      setDisabled(false)
    }
    else{
      setAlerts("Please Select a Sorting Algorithm")
      setShowAlerts(true);
    }
    }
    catch(err){
      setAlerts("Please Enter Comma Seperated Integer value!")
      setShowAlerts(true);
    }
  }
  
  const handleOnClose = ()=>{
    // console.log("Hello world!")
    setDisabled(true)
    setShowOutput(false);
    selected.current.disabled=false;
    selected.current.style.backgroundColor='rgb(255,255,255)';
  }
  
  const handleOnClear=()=>{
    genBtn.current.innerText="Generate Array";
    setText("");
    difficulty.current.selectedIndex = 0;
  }

  const handleOnGenerate = ()=>{
    genBtn.current.innerText="Change Difficulty";
    difficulty.current.style.display="";
    genBtn.current.style.display="none";
  }

  const arrayGen = ()=>{
    if(difficulty.current.value==="0"){return;}
    let num = difficulty.current.value;
    setText(generateRandomArray(num,-num,num));
    console.log(difficulty.current.value)
    difficulty.current.style.display="none";
    genBtn.current.style.display="";
  }

  const handleOnCompare = async () => {
    const baseArray = Text.split(',').map(item => {
      const trimmed = item.trim();
      const num = parseFloat(trimmed);
      return isNaN(num) ? trimmed : num;
    });

    console.log("Compare");

    let visualArr = null;

    // Insertion Sort
    const insertionArray = [...baseArray];
    const inSort = await insertionSort(visualArr, swapBars, insertionArray, setArray, 0);

    // Merge Sort
    const mergeObj = { count: 0 };
    const mergeArray = [...baseArray];
    await mergeSort(visualArr, mergeArray, 0, mergeArray.length - 1, setArray, swapBars, mergeObj, 0);

    // Quick Sort
    const quickObj = { count: 0 };
    const quickArray = [...baseArray];
    await quickSort(visualArr, quickArray, setArray, 0, quickArray.length - 1, quickObj, swapBars, 0);

    // Heap Sort
    const heapObj = { count: 0 };
    const heapArray = [...baseArray];
    await heapSort(visualArr, heapArray, setArray, swapBars, heapObj, 0);

    // Determine best algorithm
    const results = [
      { name: 'Insertion Sort', count: inSort },
      { name: 'Merge Sort', count: mergeObj.count },
      { name: 'Quick Sort', count: quickObj.count },
      { name: 'Heap Sort', count: heapObj.count }
    ];

    const best = results.reduce((prev, curr) => (curr.count < prev.count ? curr : prev));
    const allEqual = results.every(r => r.count === best.count);

    if (allEqual) {
      setAlerts(`All are equivalent for the given Array with number of comparisons: ${best.count}`);
    } else {
      setAlerts(
        `${best.name} is best for the given Array\nNo. of Comparisons -\n` +
        results.map(r => `${r.name}: ${r.count}`).join('\n')
      );
    }

    setShowAlerts(true);
  };

  return (
    <div className="row container">
        <div class="form-floating col-12 ">
            <input
            class="form-control" 
            placeholder="Enter an array seperated by commas" 
            id="floatingInput" 
            onChange={handleOnChange}
            value={Text}
            />
            <label for="floatingTextarea">Enter an array seperated by commas</label>
        </div>
          <div className="col-12 col-md-2 mt-2">
            <select ref={selected} className="form-select">
              <option value="0" defaultValue>Sorting Algorithm</option>
              <option value="Insertion">Insertion Sort</option>
              <option value="Merge">Merge Sort</option>
              <option value="Quick">Quick Sort</option>
              <option value="Heap">Heap Sort</option>
            </select>
          </div>

          <div className="col-6 col-md-2 mt-2">
            <button className="btn btn-success w-100" onClick={handleOnClick} disabled={!isDisabled}>Visualise</button>
          </div>

          <div className="col-6 col-md-2 mt-2">
            <button className="btn btn-danger w-100" onClick={handleOnClose} disabled={isDisabled}>Close</button>
          </div>

          <div className="col-6 col-md-2 mt-2">
            <button className="btn btn-danger w-100" onClick={handleOnClear}>Clear</button>
          </div>

          <div className="col-6 col-md-2 mt-2">
            <button ref={genBtn} className="btn btn-primary w-100" onClick={handleOnGenerate} disabled={!isDisabled}>Generate Array</button>
            <select
              ref={difficulty}
              style={{ display: 'none'}}
              className="form-select w-100"
              onChange={arrayGen}
            >
              <option value="0" defaultValue>Select Difficulty</option>
              <option value={50}>Easy Array</option>
              <option value={70}>Medium Array</option>
              <option value={100}>Hard Array</option>
            </select>
          </div>

          <div className="col-12 col-md-4 mt-2">
            <button className="btn btn-warning w-100" onClick={handleOnCompare} disabled={!isDisabled}>Compare Algorithm</button>
          </div>
    </div>
  )
}
