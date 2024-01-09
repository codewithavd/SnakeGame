//game's variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("eat.mp3");
const killedSound = new Audio("kill.mp3");
const gameOverSound = new Audio("dead.mp3");
const music = new Audio("back.mp3");
const moveSound = new Audio("click.mp3");
let speed;
var score=0;
var p;
music.play()
setTimeout(function () {
  p = prompt("enter 1 for hard , 2 for medium, 3 for easy");
  p = Number.parseInt(p);
  if (p == 1) {
    speed = 6;
  } else if (p == 2) {
    speed = 5;
  } else {
    speed = 4;
  }
}, 1000);

let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
var up = 16;
var lp = 1;
food = {
  x: Math.round(lp + (up - lp) * Math.random()),
  y: Math.round(lp + (up - lp) * Math.random()),
};

//game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(sarr) {
  // if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
}
function gameEngine() {
  // part 1: Updating the snake array
  if (isCollide(snakeArr)) {
    gameOverSound.play();

    killedSound.play();

    music.pause();

    inputDir = { x: 0, y: 0 };
    alert("Game is over");
    var x = confirm("Do you want to continue?");
    if (x === true) {
      snakeArr = [{ x: 13, y: 15 }];
      music.play();
      score = 0;
    } else {
      prompt(" Please share your review");
    }
  }
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if(score > hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
        hiscoreBox.innerHTML = "Hiscore : "+ hiscoreval;
    }
    scoreBox.innerHTML = "Score :"+ score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,

    })
 
    let a = 2,
      b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  //part 2: Display the Snake and food
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //displaying the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//highscore
let hiscore = localStorage.getItem("hiscore");
iocalStorage.setItem("hiscore",JSON.stringify(hiscoreval))
if(hiscore== null){
    hiscoreval = 0;
    l}
else{
  
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore :"+ hiscore;
}

//game logic here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

