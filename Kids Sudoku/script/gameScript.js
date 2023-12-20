import {
  loadCollection,
  setRondomImgs,
  playSodoku,
  startTime,
} from "./function.js";

let collectionNum = localStorage.getItem("collection");
let gameBox = document.querySelector(".gameBox");
let collectionDiv = document.querySelector(".collection");
let activIndex = [1, 1];
let kidName = localStorage.getItem("name");
let level = localStorage.getItem("level");
let welcomeHeader = document.querySelector("h1");
let timerDiv = document.querySelector(".timer");
let startButton = document.querySelector("#start");
let winMessage = document.querySelector(".winMessage");
let loseMessage = document.querySelector(".loseMessage");
let minutes;
let seconds;
if (level == 1) {
  minutes = 3;
  seconds = 0;
} else if (level == 2) {
  minutes = 2;
  seconds = 0;
} else if (level == 3) {
  minutes = 1;
  seconds = 0;
} else if (level == 4) {
  minutes = 0;
  seconds = 30;
}
welcomeHeader.innerText = `Hello ${kidName}!`;
loadCollection(collectionDiv, collectionNum);
startButton.onclick = function () {
  let timerId = startTime(minutes, seconds, timerDiv, loseMessage);
  setRondomImgs(gameBox, collectionNum);
  playSodoku(gameBox, activIndex, collectionNum, winMessage, timerId);
  this.innerText = "Retry";
  this.onclick = function () {
    window.location.href = window.location.href;
  };
};
