export const swapBars = (ref, i, j, delay) => {
  return new Promise((resolve) => {
    if(delay==0) return resolve();
    if (!ref && !ref.current) return resolve();

    const children = ref.current.children;

    if (children[i] && children[j]) {
      // Scroll bars into view horizontally
      children[i].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center', // ensures horizontal scroll
      });

      children[j].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });

      // Highlight
      children[i].style.background = 'red';
      children[j].style.background = 'red';

      setTimeout(() => {
        children[i].style.background='linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)';
        children[j].style.background='linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)';
        resolve();
      }, delay);
    } else {
      resolve();
    }
  });
};

export function generateRandomArray(length = 50, min = -50, max = 100) {
    let arr = '';
    for (let i = 0; i < length; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      arr+=num+',';
    }
    return arr.slice(0,-1);
  }