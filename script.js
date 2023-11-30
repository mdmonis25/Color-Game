let timeInSeconds = 0;
let timer = 10;
var pickedColor = "";
let gameRecords = [];
var timerval = "";
function updateTimer() {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  timerval = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

}
function startTimer() {
  setInterval(function () {
    timeInSeconds++;
    updateTimer();
  }, 1000);
}

function startGame() {
  startCountdown();
  const colors = ["red", "green", "blue"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  setTimeout(function () {
    if (pickedColor === randomColor) {
      var resultElement = document.getElementById("result");
      resultElement.style.color = randomColor;
      resultElement.textContent = "You Win!";
      increasePoints();
      updateUserInfo(
        "1221",
        parseInt(document.getElementById("points").textContent, 10), timerval,
        "Win"
      );
      updateGameRecords(
        "1221",
        parseInt(document.getElementById("points").textContent, 10), timerval,
        "Win"
      );
      setTimeout(function () {
        resultElement.textContent = "";
      }, 5000);
    } else {
      var resultElement = document.getElementById("result");
      resultElement.style.color = randomColor;
      resultElement.textContent = "You Lose!";
      decreasePoints();
      updateUserInfo(
        "1221",
        parseInt(document.getElementById("points").textContent, 10),timerval,
        "Lose"
      );
      updateGameRecords(
        "1221",
        parseInt(document.getElementById("points").textContent, 10),timerval,
        "Lose"
      );

      setTimeout(function () {
        resultElement.textContent = "";
      }, 5000);
    }
  }, 10000);
}
function startCountdown() {
  let Btn1 = document.getElementById("green");
  let Btn2 = document.getElementById("red");
  let Btn3 = document.getElementById("blue");
  Btn1.style.pointerEvents = "none";
  Btn1.disabled = true;
  Btn2.style.pointerEvents = "none";
  Btn2.disabled = true;
  Btn3.style.pointerEvents = "none";
  Btn3.disabled = true;
  var timerInt = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector("#timerval").textContent = timer;
    } else {
      Btn1.style.pointerEvents = "auto";
      Btn1.disabled = false;
      Btn2.style.pointerEvents = "auto";
      Btn2.disabled = false;
      Btn3.style.pointerEvents = "auto";
      Btn3.disabled = false;
      clearInterval(timerInt);
      timer = 10;
      document.querySelector("#timerval").textContent = timer;
    }
  }, 1000);
}
function increasePoints() {
  let pointsElement = document.getElementById("points");
  var currentPoints = parseInt(pointsElement.textContent, 10);
  currentPoints += 10;
  pointsElement.textContent = currentPoints;
}
function decreasePoints() {
  let pointsElement = document.getElementById("points");
  var currentPoints = parseInt(pointsElement.textContent, 10);
  currentPoints -= 10;
  pointsElement.textContent = currentPoints;
}

function updateUserInfo(userId, points, timer, status) {
  const userIdInfo = document.getElementById("user-id");
  const pointsInfo = document.getElementById("points");
  const timerInfo = document.getElementById("timer");
  const statusInfo = document.getElementById("result");

  userIdInfo.textContent = userId;
  pointsInfo.textContent = points;
  timerInfo.textContent = timer;
  statusInfo.textContent = status;
}
function updateGameRecords(userId, points, timer, status) {
  gameRecords.push({ userId, points, timer, status });

  if (gameRecords.length > 5) {
    gameRecords.shift();
  }
  const gameRecordsTable = document.getElementById("game-records-body");
  gameRecordsTable.innerHTML = "";
  gameRecords.forEach((record) => {
    const row = gameRecordsTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.textContent = record.userId;
    cell2.textContent = record.points;
    cell3.textContent = record.timer;
    cell4.textContent = record.status;
  });
}
document.getElementById("red").addEventListener("click", function () {
  pickedColor = "red";
  startGame();
});

document.getElementById("green").addEventListener("click", function () {
  pickedColor = "green";
  startGame();
});

document.getElementById("blue").addEventListener("click", function () {
  pickedColor = "blue";
  startGame();
});

startTimer();
