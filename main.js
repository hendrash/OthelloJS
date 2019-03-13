/**
 * Othello
 * Javascript project for CIS 343.
 * Command-line version of Othello.
 */
// Import our board definitions
const board = require('./board.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * saveFile
 * SYNCHRONOUS (blocking) file save function.
 * @param file - The full filename path we want to save to.
 * @param contents - The object we wish to save as a JSON file.
 */
function saveFile(file, contents){
	let fs = require('fs');
	fs.writeFileSync(file, JSON.stringify(contents));
}

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */
function loadFile(file){

}

/**
 * Driver function.  "main" method, if you will.
 */
function start(){
 	// Local variables
 //	let p=0;
//	let turns=["4 3","5 3","6 3","5 2","6 5","5 6"];
	
	let height = prompt('What height for your board? ');
	let width = prompt('What width for your board? ');
	//height=8;
	//width=8;
	// SYNCHRONOUSLY read from keyboard
	console.log('Creating a board with size ' + height + ' x ' + width + '.');
	// Create new board object
	let myBoard = new board(height, width);
  
  let disc = prompt('What color B or W? ');	// disc color selected by start player
	//disc='B';
	// Print board

  // Loop, asking user input, calling appropriate functions.
while(myBoard.isGameOver()){
  myBoard.printBoard();
  
  if(!myBoard.isValidMoveAvailable(disc)) {
			console.log("No valid moves available for player. You lose your turn.");
			  disc=(disc=='B' ? 'W':'B');
	} 
  else{
  
  let input = prompt("Its "+disc+"turn where do you want to move x & y:");
  
    let pos=input.split(" "); 
	let r=Number(pos[0]);
	let c=Number(pos[1]);
  if (r < 1 || r > height || c < 1 || c > width) {
					console.log("Sorry, invalid input. Try again.");
					continue;
				}
				r--;	// adjust it for zero-indexed array of board
				c--;  // adjust it for zero-indexed array of board
				if (!myBoard.isValid(r,c,disc)) {
					console.log("Sorry, that is not a valid move. Try again.");
					continue;
				}
  myBoard.placeDiskAt(r,c,disc);
  	  	console.log("Is valid Avalibale: "+myBoard.isValidMoveAvailable(disc))
  	  disc=(disc=='B' ? 'W':'B');
  }
  
}
  myBoard.printBoard();
  console.log("Congraduations "+myBoard.checkWinner()+" won the game ");
	// Save board example code.
	saveFile("test.json", myBoard);
}

console.clear();
start();
