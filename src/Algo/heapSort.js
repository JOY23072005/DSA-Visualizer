const heapify = async (visualArr,array,size,setArray,i,swapBars,countObj,delay)=>{
    if(i>=size){return;}
    let largest = i;
    let left = i*2+1;
    let right = i*2+2;
    if(left<size && array[left]>array[largest]){
        countObj.count+=1;
        largest=left;
    }
    if(right<size && array[right]>array[largest]){
        countObj.count+=1;
        largest=right;
    }
    if(i!=largest){
        await swapBars(visualArr,i,largest,delay);
        let temp = array[i];
        array[i]=array[largest];
        array[largest]=temp;
        setArray([...array]);
        await heapify(visualArr,array,size,setArray,largest,swapBars,countObj,delay)
    }
}
const heapSort = async (visualArr,array,setArray,swapBars,countObj,delay = 20)=>{
    //build a max heap
    for(let i = Math.floor(array.length / 2); i>=0;i--){
        await heapify(visualArr,array,array.length,setArray,i,swapBars,countObj,delay);
    }
    for(let i = array.length-1;i>0;i--){
        await swapBars(visualArr,i,0,delay);
        let temp = array[0];
        array[0]=array[i];
        array[i]=temp;
        setArray([...array]);
        await heapify(visualArr,array,i,setArray,0,swapBars,countObj,delay);
    }
}
export {heapSort,heapify}