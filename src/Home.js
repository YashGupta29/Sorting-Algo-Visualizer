import React, { useState } from "react";
import { delay, generateRandomArray, swap } from "./utils";

const Home = () => {
  //STATES
  const [isBusy, setIsBusy] = useState(false);
  const [array, setArray] = useState(generateRandomArray());
  const [sortedIdxArray, setSortedIdxArray] = useState([]);
  const [j1, setJ1] = useState("");
  const [j2, setJ2] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const colors = ["red", "green", "pink"];

  //FUNTIONS
  function generateNewArray() {
    setArray(generateRandomArray);
    clear();
  }

  function clear() {
    setSortedIdxArray([]);
    setJ1("");
    setJ2("");
    setIsSorted(false);
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

  async function handleBubbleSort() {
    setIsBusy(true);
    clear();
    await bubbleSort(array);
    clear();
    setIsSorted(true);
    setIsBusy(false);
  }

  async function mergeSort(array, begin, end) {
    setIsSorted(false);
    if (begin >= end) {
      return;
    }
    setJ1(begin);
    setJ2(end);
    let mid = begin + Math.floor((end - begin) / 2);
    await delay(10);
    await mergeSort(array, begin, mid);
    await delay(10);
    await mergeSort(array, mid + 1, end);
    await delay(10);
    await merge(array, begin, mid, end);
    setArray([...array]);
  }

  async function merge(array, left, mid, right) {
    let subArr1 = mid - left + 1,
      subArr2 = right - mid,
      leftArr = [],
      rightArr = [];

    let temp = [];
    for (let i = 0; i < subArr1; i++) {
      leftArr[i] = array[left + i];
      temp.push(left + i);
    }
    for (let i = 0; i < subArr2; i++) {
      rightArr[i] = array[mid + 1 + i];
      temp.push(mid + i + 1);
    }

    setSortedIdxArray(temp);

    let i1 = 0,
      i2 = 0,
      im = left;

    while (i1 < subArr1 && i2 < subArr2) {
      if (leftArr[i1] <= rightArr[i2]) {
        array[im] = leftArr[i1];
        i1++;
      } else {
        array[im] = rightArr[i2];
        i2++;
      }
      im++;
    }

    while (i1 < subArr1) {
      array[im] = leftArr[i1];
      i1++;
      im++;
    }

    while (i2 < subArr2) {
      array[im] = rightArr[i2];
      i2++;
      im++;
    }
  }

  async function handleMergeSort() {
    setIsBusy(true);
    clear();
    await mergeSort(array, 0, array.length - 1);
    clear();
    setIsSorted(true);
    setIsBusy(false);
  }

  async function insertionSort(array) {
    let sortedIdexed = [0, 1];
    setSortedIdxArray(sortedIdexed);
    for (let i = 1; i < array.length; i++) {
      await delay(100);
      let key = array[i];
      await inner(array, key, i);
      sortedIdexed.push(i + 1);
      setSortedIdxArray(sortedIdexed);
    }
  }

  async function inner(array, key, i) {
    let j = i - 1;
    while (array[j] > key && j >= 0) {
      await delay(10);
      swap(array, j, j + 1);
      await delay(10);
      setJ2(j);
      j--;
    }
  }

  async function handleInsertionSort() {
    setIsBusy(true);
    clear();
    await insertionSort(array);
    clear();
    setIsSorted(true);
    setIsBusy(false);
  }

  return (
    <div className="home" id="home">
      <div className="container">
        <div className="btns d-flex justify-content-between align-items-center">
          <button
            className="cta px-3 py-2"
            onClick={generateNewArray}
            disabled={isBusy}
          >
            Generate New Array
          </button>
          <button
            className="cta px-3 py-2"
            onClick={handleBubbleSort}
            disabled={isBusy || isSorted}
          >
            Bubble Sort
          </button>
          <button className="cta px-3 py-2" disabled={isBusy || isSorted}>
            Quick Sort
          </button>
          <button
            className="cta px-3 py-2"
            onClick={handleInsertionSort}
            disabled={isBusy || isSorted}
          >
            Insertion Sort
          </button>
          <button
            className="cta px-3 py-2"
            onClick={handleMergeSort}
            disabled={isBusy || isSorted}
          >
            Merge Sort
          </button>
        </div>
        <div className="bars d-flex mt-5 align-items-end">
          {array.map((value, index) => (
            <div
              className="bar"
              key={index}
              style={{
                height: `${Math.floor(value)}px`,
                backgroundColor: isSorted
                  ? colors[2]
                  : j1 === index || j2 === index
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
