import React, { useEffect, useState } from "react";
import { delay, generateRandomArray, swap } from "./utils";

const Home = () => {
  //STATES
  const [array, setArray] = useState(generateRandomArray());
  const [sortedIdxArray, setSortedIdxArray] = useState([]);
  const [j1, setJ1] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const colors = ["red", "green", "pink"];

  //FUNTIONS
  function generateNewArray() {
    setArray(generateRandomArray);
    setSortedIdxArray([]);
    setJ1("");
  }

  async function bubbleSort(array) {
    setIsSorted(false);
    let sortedIndexes = [];
    for (let i = 0; i < array.length; i++) {
      await delay(1);
      await innerLoop(i, array);
      sortedIndexes.push(array.length - i - 1);
      setSortedIdxArray(sortedIndexes);
      setJ1("");
    }
    setSortedIdxArray([]);
    setJ1("");
    setIsSorted(true);
  }

  async function innerLoop(i, array) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        array = await swap(array, j, j + 1);
      }
      setJ1(j + 1);
      setArray(array);
      await delay(1);
    }
  }

  function handleBubbleSort() {
    bubbleSort(array);
  }

  return (
    <div className="home" id="home">
      <div className="container">
        <div className="btns d-flex justify-content-between align-items-center">
          <button className="cta px-3 py-2" onClick={generateNewArray}>
            Generate New Array
          </button>
          <button className="cta px-3 py-2" onClick={handleBubbleSort}>
            Bubble Sort
          </button>
          <button className="cta px-3 py-2">Quick Sort</button>
          <button className="cta px-3 py-2">Insertion Sort</button>
          <button className="cta px-3 py-2">Merge Sort</button>
        </div>
        <div className="bars d-flex mt-5 align-items-end">
          {array.map((value, index) => (
            <div
              className="bar"
              key={index}
              style={{
                height: `${Math.floor(value / 2000)}px`,
                backgroundColor: isSorted
                  ? colors[2]
                  : j1 === index
                  ? colors[0]
                  : sortedIdxArray.includes(index)
                  ? colors[1]
                  : "#fff",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
