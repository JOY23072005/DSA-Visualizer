const Partition = async (visualArr,array,setArray,low,high,countObj,swapBars,delay)=>{
    let pivot = array[high];
    let i = low-1;
    for(let j = low;j<high;j++){
        countObj.count+=1;
        if(array[j]<pivot){
            i++;
            await swapBars(visualArr,i,j,delay);
            let temp= array[i];
            array[i]=array[j];
            array[j]=temp;
            await setArray([...array]);
        }
    }
    await swapBars(visualArr,i+1,high,delay);
    let temp= array[i+1];
    array[i+1]=array[high];
    array[high]=temp;
    await setArray([...array]);
    return (i+1);
}
const quickSort = async (visualArr,array,setArray,low,high,countObj,swapBars,delay = 20)=>{
    if(low<high){
        let pivotIdx = await Partition(visualArr,array,setArray,low,high,countObj,swapBars,delay);
        await quickSort(visualArr,array,setArray,low,pivotIdx-1,countObj,swapBars,delay);
        await quickSort(visualArr,array,setArray,pivotIdx+1,high,countObj,swapBars,delay);
    }
}

export { quickSort , Partition }