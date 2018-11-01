
let redBlocks = 0;
let greenBlocks = 0;
let isMillRed = false;
let isMillGreen = false;
let isActiveRed = false;
let isActiveGreen = false;
let isGreenThreeLeft = false;
let isRedThreeLeft = false;
let blockWidth = 16;
let strokeWidth = 2;
let lastX = 0;
let lastY = 0;
let lastCenterX = 0;
let lastCenterY = 0;
let numberOfTurns = 0;
let rows = 7;
let columns = 7;
let clickSound;
let positionMatrix = [];

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');


function initializeGame() {
  clickSound = new sound('sound.wav');
  initializeArray();
  alert('Player 1 turns first followed by Player 2');
}

function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
}

function initializeArray() {
  for (let i = 0; i < 7; i++) {
    // referenceMatrix[i] = new Array(7);
    positionMatrix[i] = new Array(7);
  }

  for (let j = 0; j < 7; j++) {
    for (let k = 0; k < 7; k++) {
      // Make all diagonal elements + boundary + center to zero
      if ((j == 3) || (k == 3) || (j == k) || (j + k == 6)) {
        // referenceMatrix[j][k] = 0;
        positionMatrix[j][k] = 0;
      } else {
        positionMatrix[j][k] = -1;
      }
    }
  }
  
  positionMatrix[3][3] = -1;

}

function makeMove(X, Y) {
  let yCenter;
  let xCenter;

  switch (X) {
    case 0:
      {
        switch (Y) {
          case 0:
            {
              yCenter = 25;
              xCenter = 25;
              break;
            }
          case 3:
            {
              yCenter = 275;
              xCenter = 25;
              break;
            }
          case 6:
            {
              yCenter = 525;
              xCenter = 25;
              break;
            }
        }
        break;
      }
    case 1:
      {
        switch (Y) {
          case 1:
            {
              yCenter = 100;
              xCenter = 100;
              break;
            }
          case 3:
            {
              yCenter = 275;
              xCenter = 100;
              break;
            }
          case 5:
            {
              yCenter = 450;
              xCenter = 100;
              break;
            }
        }
        break;
      }
    case 2:
      {
        switch (Y) {
          case 2:
            {
              yCenter = 175;
              xCenter = 175;
              break;
            }
          case 3:
            {
              yCenter = 275;
              xCenter = 175;
              break;
            }
          case 4:
            {
              yCenter = 375;
              xCenter = 175;
              break;
            }
        }
        break;
      }
    case 3:
      {
        switch (Y) {
          case 0:
            {
              yCenter = 25;
              xCenter = 275;
              break;
            }
          case 1:
            {
              yCenter = 100;
              xCenter = 275;
              break;
            }
          case 2:
            {
              yCenter = 175;
              xCenter = 275;
              break;
            }
          case 4:
            {
              yCenter = 375;
              xCenter = 275;
              break;
            }
          case 5:
            {
              yCenter = 450;
              xCenter = 275;
              break;
            }
          case 6:
            {
              yCenter = 525;
              xCenter = 275;
              break;
            }
        }
        break;
      }
    case 4:
      {
        switch (Y) {
          case 2:
            {
              yCenter = 175;
              xCenter = 375;
              break;
            }
          case 3:
            {
              yCenter = 275;
              xCenter = 375;
              break;
            }
          case 4:
            {
              yCenter = 375;
              xCenter = 375;
              break;
            }
        }
        break;
      }
    case 5:
      {
        switch (Y) {
          case 1:
            {
              yCenter = 100;
              xCenter = 450;
              break;
            }
          case 3:
            {
              yCenter = 275;
              xCenter = 450;
              break;
            }
          case 5:
            {
              yCenter = 450;
              xCenter = 450;
              break;
            }
        }
        break;
      }
    case 6:
      {
        switch (Y) {
          case 0:
            {
              yCenter = 25;
              xCenter = 525;
              break;
            }
          case 3:
            {
              yCenter = 275;
              xCenter = 525;
              break;
            }
          case 6:
            {
              yCenter = 525;
              xCenter = 525;
              break;
            }
        }
        break;
      }
  }
//checking mill
function checkMill(x, y, playerCode) {
  //Using the fact that two mills cannot occur simultaneously
  var flag = 0;
  var temp = 0;
  //Transverse through the given row and column and check for mill
  for (var i = 0; i < 5; i++) {
    flag = 0;
    for (var j = temp; j < temp + 3; j++) {
      if (positionMatrix[j][y] == playerCode) {
        continue;
      } else {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      //console.log("This is from : " + 1);
      return true;
    }
    temp++;

  }

  flag = 0;
  temp = 0;
  //Now moving along the given column
  for (var k = 0; k < 5; k++) {
    flag = 0;
    for (var l = temp; l < temp + 3; l++) {
      if (positionMatrix[x][l] == playerCode) {
        continue;
      } else {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      // console.log("This is from : " + 2);
      return true;
    } else {
      temp++;
    }
  }

  var check = true;
  var oppositeCode = (playerCode == 1) ? 2 : 1;
  for (var a = 0; a < 7; a++) {
    if ((positionMatrix[a][y] == oppositeCode) || (positionMatrix[a][y] == 0)) {
      check = false;
      break;
    }
  }
  if (check == true) {
    //console.log("This is from : " + 3);
    return true;
  }
  check = true;

  for (var b = 0; b < 7; b++) {
    //Check for any empty element of any element of anther type
    if ((positionMatrix[x][b] == oppositeCode) || (positionMatrix[x][b] == 0)) {
      check = false;
      break;
    }
  }
  if (check == true) {
    //console.log("This is from : " + 4);
    return true;
  }

  return false;
}
  if (isMillGreen || isMillRed) { 
//checking mill if green
    let playerCode = (isMillGreen) ? 1 : 2; //creatin a variable for millgreen
    
    if (positionMatrix[X][Y] != playerCode && (positionMatrix[X][Y] != 0)) {
      // Check that it shouldn't be the part of other mill
      if (!checkMill(X, Y, ((isMillRed) ? 1 : 2)) || allArePartOfMill(((isMillRed) ? 1 : 2))) {
        // Remove that block and update array value to zero
        clickSound.play();
        if (playerCode == 1) {
          redBlocks--;
          document.getElementById('message').innerHTML = 'Red block removed';
        } else {
          document.getElementById('message').innerHTML = 'Green block removed';
          greenBlocks--;
        }
        //removing block piece
        context.clearRect(xCenter - blockWidth - strokeWidth, yCenter - blockWidth - strokeWidth,
          2 * (blockWidth + strokeWidth), 2 * (blockWidth + strokeWidth));
        positionMatrix[X][Y] = 0; //restoring value in array to 0
        turnOffMill(); // calling a function which will update my  variables to false again
        update(); // calling update function to update player's turn
      } else {
        document.getElementById('message').innerHTML = "Can't remove a block which is already a part of mill";
      }
    }
  } else if (numberOfTurns >= 18 && (isActiveRed || isActiveGreen)) { // if block pieces are set on board lets move pieces 


    if ((((X == lastX) && (Y == lastY)) || (positionMatrix[X][Y] == 1 || positionMatrix[X][Y] == 2))) {
      turnOffActive(lastCenterX, lastCenterY);
    //case 
      
    }

    if ((positionMatrix[X][Y] == 0)) {
      // Checking for adjacent element.
      if (((X == lastX) || (Y == lastY))) {
        if (X == 0 || X == 6 || Y == 0 || Y == 6) {
          if (((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 3) || ((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 1)) {
            // Remove previous block and make a new block at the the given position
            positionMatrix[lastX][lastY] = 0;
            clearBlock(lastCenterX, lastCenterY);
            drawBlock(xCenter, yCenter, X, Y);
          }
        } else if (X == 1 || X == 5 || Y == 1 || Y == 5) {
          if (((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 2) || ((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 1)) {
            // Remove previous block and make a new block at the the given position
            positionMatrix[lastX][lastY] = 0;
            clearBlock(lastCenterX, lastCenterY);
            drawBlock(xCenter, yCenter, X, Y);
          }
        } else if (X == 2 || X == 4 || Y == 2 || Y == 4) {
          if (((Math.abs(X - lastX) + Math.abs(Y - lastY)) == 1)) {
            // Remove previous block and make a new block at the the given position
            positionMatrix[lastX][lastY] = 0;
            clearBlock(lastCenterX, lastCenterY);
            drawBlock(xCenter, yCenter, X, Y);
          }
        }

      } else if (isGreenThreeLeft && (positionMatrix[lastX][lastY] == playerOneCode)) {
        positionMatrix[lastX][lastY] = 0;
        clearBlock(lastCenterX, lastCenterY);
        drawBlock(xCenter, yCenter, X, Y);
      } else if (isRedThreeLeft && (positionMatrix[lastX][lastY] == playerTwoCode)) {
        positionMatrix[lastX][lastY] = 0;
        clearBlock(lastCenterX, lastCenterY);
        drawBlock(xCenter, yCenter, X, Y);
      } else {
        turnOffActive(lastCenterX, lastCenterY);
      }

    }
  } else if (positionMatrix[X][Y] == 0 && numberOfTurns < 18) {

    clickSound.play();
    if (numberOfTurns % 2 != 0) {
      // Player two made a move, hence made a block red.
      redBlocks++;
      positionMatrix[X][Y] = 2;
      context.beginPath();
      context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
      context.fillStyle = '#F44336';
      context.fill();
      context.lineWidth = strokeWidth;
      context.strokeStyle = '#003300';
      context.stroke();
      document.getElementById('turn').innerHTML = 'P1';
      if (checkMill(X, Y, 2)) {
        isMillRed = true;
        document.getElementById('turn').innerHTML = 'P2';
        document.getElementById('message').innerHTML = 'A Mill is formed. Click on green block to remove it.';
      } else {
        document.getElementById('message').innerHTML = 'Click on empty spot to place your piece';
      }

    } else {
      // Player one just made a move, hence made a block green
      greenBlocks++;
      positionMatrix[X][Y] = 1;
      context.beginPath();
      context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
      context.fillStyle = '#2E7D32';
      context.fill();
      context.lineWidth = strokeWidth;
      context.strokeStyle = '#003300';
      context.stroke();
      document.getElementById('turn').innerHTML = 'P2';
      if (checkMill(X, Y, 1)) {
        isMillGreen = true;
        document.getElementById('turn').innerHTML = 'P1';
        document.getElementById('message').innerHTML = 'A Mill is formed. Click on red block to remove it.';
      } else {
        document.getElementById('message').innerHTML = 'Click on empty spot to place your piece';
      }


    }
    if (numberOfTurns == 17) {
      document.getElementById('message').innerHTML = 'Now, Move one step by clicking on Block';
    }
    numberOfTurns++;

  } else if (numberOfTurns >= 18 && positionMatrix[X][Y] != 0) {
    // Do nothing when clicked on empty element and check the all possible moves that
    // a player have after clicking on a  particular position of his own color.
    if (numberOfTurns % 2 != 0 && positionMatrix[X][Y] == 2) {
      // Player two made a move, hence made a block fade red.
      clickSound.play();
      isActiveRed = true;
      if (checkThreeLeft(playerTwoCode)) {
        isRedThreeLeft = true;
        document.getElementById('message').innerHTML = 'Red can now move anywhere (3 are left only)';
      } else {
        document.getElementById('message').innerHTML = 'Move one step by clicking on Block';
      }
      updateLastParam(xCenter, yCenter, X, Y);
      context.beginPath();
      context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
      context.fillStyle = '#FFCDD2';
      context.fill();
      context.lineWidth = strokeWidth;
      context.strokeStyle = '#003300';
      context.stroke();
    } else if (numberOfTurns % 2 == 0 && positionMatrix[X][Y] == 1) {
      // Player one just made a move, hence made a block green
      clickSound.play();
      isActiveGreen = true;
      if (checkThreeLeft(playerOneCode)) {
        isGreenThreeLeft = true;
        document.getElementById('message').innerHTML = 'Green can now move anywhere (3 are left only)';
      } else {
        document.getElementById('message').innerHTML = 'Move one step by clicking on Block';
      }
      updateLastParam(xCenter, yCenter, X, Y);
      context.beginPath();
      context.arc(xCenter, yCenter, blockWidth, 0, 2 * Math.PI, false);
      context.fillStyle = '#AED581';
      context.fill();
      context.lineWidth = strokeWidth;
      context.strokeStyle = '#003300';
      context.stroke();
    }

  }
}

canvas.addEventListener('click', mouseClick);

function mouseClick(event) {
  // Get the X and Y co-ordinate at the point of touch in canvas
  let X = event.clientX - (canvas.getBoundingClientRect()).left;
  let Y = event.clientY - (canvas.getBoundingClientRect()).top;

  // Check if touch event occurs in canvas or not
  if ((X >= 0 && X <= 550) && (Y >= 0 && Y <= 550)) {
    if ((X >= 0 && X <= 75) && (Y >= 0 && Y <= 75)) {
      makeMove(0, 0);
    } else if ((X >= 235 && X <= 315) && (Y >= 0 && Y <= 75)) {
      makeMove(3, 0);
    } else if ((X >= 475 && X <= 550) && (Y >= 0 && Y <= 75)) {
      makeMove(6, 0);
    } else if ((X >= 75 && X <= 155) && (Y >= 75 && Y <= 155)) {
      makeMove(1, 1);
    } else if ((X >= 235 && X <= 315) && (Y >= 75 && Y <= 155)) {
      makeMove(3, 1);
    } else if ((X >= 395 && X <= 475) && (Y >= 75 && Y <= 155)) {
      makeMove(5, 1);
    } else if ((X >= 155 && X <= 235) && (Y >= 155 && Y <= 235)) {
      makeMove(2, 2);
    } else if ((X >= 235 && X <= 315) && (Y >= 155 && Y <= 235)) {
      makeMove(3, 2);
    } else if ((X >= 315 && X <= 395) && (Y >= 155 && Y <= 235)) {
      makeMove(4, 2);
    } else if ((X >= 0 && X <= 75) && (Y >= 235 && Y <= 315)) {
      makeMove(0, 3);
    } else if ((X >= 75 && X <= 155) && (Y >= 235 && Y <= 315)) {
      makeMove(1, 3);
    } else if ((X >= 155 && X <= 235) && (Y >= 235 && Y <= 315)) {
      makeMove(2, 3);
    } else if ((X >= 315 && X <= 395) && (Y >= 235 && Y <= 315)) {
      makeMove(4, 3);
    } else if ((X >= 395 && X <= 475) && (Y >= 235 && Y <= 315)) {
      makeMove(5, 3);
    } else if ((X >= 475 && X <= 550) && (Y >= 235 && Y <= 315)) {
      makeMove(6, 3);
    } else if ((X >= 155 && X <= 235) && (Y >= 315 && Y <= 395)) {
      makeMove(2, 4);
    } else if ((X >= 235 && X <= 315) && (Y >= 315 && Y <= 395)) {
      makeMove(3, 4);
    } else if ((X >= 315 && X <= 395) && (Y >= 315 && Y <= 395)) {
      makeMove(4, 4);
    } else if ((X >= 75 && X <= 155) && (Y >= 395 && Y <= 475)) {
      makeMove(1, 5);
    } else if ((X >= 235 && X <= 315) && (Y >= 395 && Y <= 475)) {
      makeMove(3, 5);
    } else if ((X >= 395 && X <= 475) && (Y >= 395 && Y <= 475)) {
      makeMove(5, 5);
    } else if ((X >= 0 && X <= 75) && (Y >= 475 && Y <= 550)) {
      makeMove(0, 6);
    } else if ((X >= 235 && X <= 315) && (Y >= 475 && Y <= 550)) {
      makeMove(3, 6);
    } else if ((X >= 475 && X <= 550) && (Y >= 475 && Y <= 550)) {
      makeMove(6, 6);
    }
  }
}

function updateLastParam(xCenter, yCenter, X, Y) {
  lastCenterX = xCenter;
  lastCenterY = yCenter;
  lastX = X;
  lastY = Y;
}

function turnOffActive(x, y) {
  clickSound.play();
  context.beginPath();
  context.arc(x, y, blockWidth, 0, 2 * Math.PI, false);
  if (isActiveRed) {
    context.fillStyle = '#F44336';
  } else {
    context.fillStyle = '#2E7D32';
  }
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#003300';
  context.stroke();
  isActiveRed = false;
  isActiveGreen = false;
}

function turnOffMill() {
  isMillGreen = false;
  isMillRed = false;
}

function clearBlock(xI, yI) {
  clickSound.play();
  // Clear canvas at previous position
  context.clearRect(xI - blockWidth - strokeWidth, yI - blockWidth - strokeWidth,
    2 * (blockWidth + strokeWidth), 2 * (blockWidth + strokeWidth));
  positionMatrix[lastX][lastY] = 0;

}

function drawBlock(x, y, X, Y) {
  context.beginPath();
  context.arc(x, y, blockWidth, 0, 2 * Math.PI, false);
  if (isActiveRed) {
    positionMatrix[X][Y] = 2;
    context.fillStyle = '#F44336';
    if (checkMill(X, Y, 2)) {
      isMillRed = true;
      document.getElementById('message').innerHTML = 'Click on green block to remove it.';
    }
  } else {
    positionMatrix[X][Y] = 1;
    context.fillStyle = '#2E7D32';
    if (checkMill(X, Y, 1)) {
      isMillGreen = true;
      document.getElementById('message').innerHTML = 'Click on red block to remove it.';
    }
  }
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#003300';
  context.stroke();

  isActiveGreen = false;
  isActiveRed = false;
  numberOfTurns++;
  update();
}



function checkThreeLeft(playerCode) {
  return (numberOfTurns >= 18 && (((playerCode == 1) ? greenBlocks : redBlocks) == 3));
}


function allArePartOfMill(playerCode) {
  // return false if atleast one of them is not a part of the mill
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (positionMatrix[i][j] == playerCode) {
        if (!checkMill(i, j, playerCode)) {
          return false;
        }
      }

    }
  }
  return true;
}
function update() {
  // Update player turn
  if (numberOfTurns % 2 != 0) {
    document.getElementById('turn').innerHTML = 'P2';
  } else {
    document.getElementById('turn').innerHTML = 'P1';
  }
}