const merge = async (visualArr,arr,low,mid,high,setArray,swapBars,countObj,delay)=>{
    let lsize = mid - low + 1;
    let rsize = high - (mid+1) + 1;
    let left = new Array(lsize);
    let right = new Array(rsize);
    for(let i = 0;i<lsize;i++){
        left[i]=arr[i+low];
    }
    for(let i = 0;i<rsize;i++){
        right[i]=arr[i+(mid+1)];
    }
    let i=0;//left
    let j=0;//right
    let k = low;//main array
    while(i<lsize && j<rsize){
        countObj.count+=1;
        await swapBars(visualArr,low+i,(mid+1)+j,delay);
        if(left[i]<=right[j]){
            arr[k++]=left[i++];
        }
        else{
            arr[k++]=right[j++];
        }
        await setArray([...arr]);
    }
    while(i<lsize){
        await swapBars(visualArr,low+i,k,delay);
        arr[k++]=left[i++];
        await setArray([...arr]);
    }
    while(j<rsize){
        await swapBars(visualArr,k,(mid+1)+j,delay);
        arr[k++]=right[j++];
        await setArray([...arr]);
    }
}

const mergeSort= async (visualArr,Array,low,high,setArray,swapBars,countObj,delay = 20)=>{
    if(high>low){
        let mid = Math.floor((low + high) / 2);
        await mergeSort(visualArr,Array,low,mid,setArray,swapBars,countObj,delay);
        await mergeSort(visualArr,Array,mid+1,high,setArray,swapBars,countObj,delay);
        await merge(visualArr,Array,low,mid,high,setArray,swapBars,countObj,delay);
    }
}

export {merge, mergeSort};