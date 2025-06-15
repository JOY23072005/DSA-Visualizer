# DSA Visualizer

A **React-based interactive visualizer** for popular sorting algorithms. Users can input custom arrays or generate randomized data, select a sorting algorithm, and watch the algorithm animate step-by-step with colored bar comparisons.

## 🔧 Features

* ✅ Input custom comma-separated arrays (numbers or characters).
* ✅ Select and visualize one of the following sorting algorithms:

  * Insertion Sort
  * Merge Sort
  * Quick Sort
  * Heap Sort
* ✅ Bar visualizations with color-coded steps:

  * Blue: Unsorted/default state
  * Red: During comparison/swapping
  * Green: Sorted state
* ✅ Fullscreen mode support for immersive visualization
* ✅ Random array generation by difficulty:

  * Easy (50 elements)
  * Medium (70 elements)
  * Hard (100 elements)
* ✅ Algorithm comparison mode — evaluates and shows number of comparisons for each algorithm on same input
* ✅ Alert system for guidance and error handling

## 📁 Folder Structure

```
DSA-Visualizer/
├── public/
├── src/
│   ├── Algo/
│   │   ├── insertionSort.js
│   │   ├── mergeSort.js
│   │   ├── quickSort.js
│   │   ├── heapSort.js
│   │   └── utility.js
│   ├── components/
│   │   ├── Input.jsx
│   │   ├── Output.jsx
│   │   └── Alert.jsx
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## 📦 Tech Stack

* React.js
* Bootstrap for layout
* Custom CSS animations for bar visualization

## 📷 Screenshots

<img width="1680" alt="Image" src="https://github.com/JOY23072005/DSA-Visualizer/blob/main/public/1.png" />
<img width="1678" alt="Image" src="https://github.com/JOY23072005/DSA-Visualizer/blob/main/public/2.png" />
<img width="1680" alt="Image" src="https://github.com/JOY23072005/DSA-Visualizer/blob/main/public/3.png" />

---

## 🏁 Getting Started

```bash
# Clone the repo
https://github.com/JOY23072005/DSA-Visualizer.git

# Navigate into the project directory
cd DSA-Visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open your browser and go to `http://localhost:5173/`

## 🧠 How it Works

* Sorting functions (Insertion, Merge, Quick, Heap) are asynchronous.
* `swapBars()` function is used to update colors, swap values, and animate DOM.
* `setArray()` is used to trigger re-render of `Output.jsx`.
* `Output.jsx` uses `useRef` and `useEffect` to draw the bars and run selected sorting logic.

## 📌 Future Scope

* Add more algorithms (e.g., Bubble Sort, Selection Sort, Radix Sort)
* Add graph-based visualizations (BFS, DFS, Dijkstra, A\*)
* Add step-by-step explanation in text beside the animation
* Add a scoring/quiz-based system to test understanding

## 🙌 Author

Made with ❤️ by Joydeep Hans

---

Feel free to contribute or fork this project!
