function generateRandomArray() {
  let array = [];
  for (let i = 1; i < getRandomIntFromInterval(150, 150); i++) {
    array.push(getRandomIntFromInterval(10, 1000000));
  }
  return array;
}

function getRandomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function swap(array, pos1, pos2) {
  let temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;

  return array;
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
  generateRandomArray,
  swap,
  delay,
};
