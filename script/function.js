export const loadCollection = function (Div, index) {
  for (let j = 1; j <= 4; j++) {
    let img = document.createElement("img");
    img.src = `../Img/${index}/${j}.png`;
    Div.append(img);
  }
};

export const changeActivBox = function (boxsContainer, index) {
  let boxs = boxsContainer.querySelectorAll("div");
  boxs.forEach((box) => {
    box.classList.remove("activ");
  });
  let activBox = boxsContainer.querySelector(`.in${index[0]}-${index[1]}`);
  activBox.classList.add("activ");
};

export const chickMinMax = function (arr, min, max) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      arr[i] = max;
    } else if (arr[i] < min) {
      arr[i] = min;
    }
  }
  return arr;
};

export const changeActivIndex = function (event, boxsContainer, index) {
  if (event === "ArrowUp") {
    index[0]--;
  } else if (event === "ArrowDown") {
    index[0]++;
  } else if (event === "ArrowRight") {
    index[1]++;
  } else if (event === "ArrowLeft") {
    index[1]--;
  }
  index = chickMinMax(index, 1, 4);
  changeActivBox(boxsContainer, index);
  return index;
};

export const rondomFromMinToMax = function (min, max) {
  let result = [];
  let rondomNum;
  for (let i = 0; i < max - min + 1; i++) {
    rondomNum = Math.round(Math.random() * (max - min) + min);
    if (result.includes(rondomNum)) {
      i--;
      continue;
    }
    result.push(rondomNum);
  }
  return result;
};

export const setRondomImgs = function (Box, folder) {
  let rondomColumn = rondomFromMinToMax(1, 4);
  let rondomRow = rondomFromMinToMax(1, 4);
  for (let i = 1; i <= 4; i++) {
    let rondomBox = Box.querySelector(
      `.in${rondomColumn[i - 1]}-${rondomRow[i - 1]} img`
    );
    rondomBox.setAttribute("src", `Img/${folder}/${i}.png`);
    rondomBox.classList.add("static");
  }
};

export const showLose = function (message) {
  message.style.display = "block";
  document.onkeydown = null;
  messageButtonsAction(message);
};

export const startTime = function (minutes, seconds, container, message) {
  let timerInterval = setInterval(function () {
    if (seconds == 0) {
      if (minutes <= 0) {
        showLose(message);
        clearInterval(timerInterval);
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    container.innerHTML = `${("0" + minutes).slice(-2)} : ${(
      "0" + seconds
    ).slice(-2)}`;
  }, 1000);
  return timerInterval;
};

export const messageButtonsAction = function (message) {
  message.querySelector("button.replay").onclick = function () {
    window.location.href = window.location.href;
  };
  message.querySelector("button.menu").onclick = function () {
    window.location.href = origin;
  };
  message.querySelector("p").onclick = function () {
    message.style.display = "none";
  };
};

export const showWin = function (message, timerId) {
  message.style.display = "block";
  clearInterval(timerId);
  document.onkeydown = null;
  messageButtonsAction(message);
};

export const playSodoku = function (gameBox, index, folder, message, timerId) {
  let activBox;
  document.onkeydown = function (event) {
    if (event.key.includes("Arrow")) {
      index = changeActivIndex(event.key, gameBox, index);
    } else if ([1, 2, 3, 4].includes(parseInt(event.key))) {
      activBox = gameBox.querySelector(`.in${index[0]}-${index[1]} img`);
      if (!activBox.className.includes("static")) {
        activBox.src = `Img/${folder}/${event.key}.png`;
        for (let i = 1; i <= 4; i++) {
          let newRowSrcSet = new Set();
          newRowSrcSet.add("");
          let newColumnSrcSet = new Set();
          newColumnSrcSet.add("");
          for (let j = 1; j <= 4; j++) {
            newRowSrcSet.add(
              gameBox.querySelector(`.in${i}-${j} img`).getAttribute("src")
            );
            newColumnSrcSet.add(
              gameBox.querySelector(`.in${j}-${i} img`).getAttribute("src")
            );
          }
          if (newRowSrcSet.size !== 5 || newColumnSrcSet.size !== 5) {
            break;
          } else if (i === 4) {
            showWin(message, timerId);
          }
        }
      }
    }
  };
};

export const validationName = function (form) {
  let nameError = form.querySelector("input#fullName+span");
  let startButton = form.querySelector(".startPlay");
  let nameBox = form.querySelector("input#fullName");
  "input blur".split(" ").forEach((event) => {
    nameBox.addEventListener(event, function () {
      if (!this.value || !/\b([a-z]+)\b/gi.test(this.value)) {
        this.classList.add("error");
        nameError.style.display = "block";
      } else {
        this.classList.remove("error");
        nameError.style.display = "none";
        startButton.disabled = false;
      }
    });
  });
};

export const startPlayingAction = function (form) {
  let nameBox = form.querySelector("input#fullName");
  let startButton = form.querySelector(".startPlay");
  let levelSelection = form.querySelector("select");
  startButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (nameBox.className.indexOf("error") == -1) {
      localStorage.setItem("name", nameBox.value);
      localStorage.setItem("level", levelSelection.value);
      window.location.replace("collection.html");
    }
    startButton.disabled = true;
  });
};

export const loadCollections = function (container, count) {
  for (let i = 1; i <= count; i++) {
    let collectionDiv = document.createElement("div");
    collectionDiv.classList.add("collection");
    for (let j = 1; j <= 4; j++) {
      let img = document.createElement("img");
      img.src = `../Img/${i}/${j}.png`;
      collectionDiv.append(img);
    }
    collectionDiv.onclick = function () {
      localStorage.setItem("collection", i);
      window.location.replace("game.html");
    };
    container.append(collectionDiv);
  }
};
