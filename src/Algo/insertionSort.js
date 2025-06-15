export const insertionSort = async (visualArr,swapBars,Array,setArray,delay = 20) => {
    let arr = [...Array]; // instead of let arr = Array
    let count = 0;
    for(let i=1;i<arr.length;i++){
        let temp = arr[i];
        let j=i-1;
        while(j>=0 && arr[j]>temp){
            count++; //comparison
            await swapBars(visualArr,j,j+1,delay);
            arr[j+1]=arr[j];
            j--;
            await setArray([...arr]);
        }
        count++;//termination of while comparison
        arr[j+1]=temp;
        await setArray([...arr]);
    }
    return count;
  };