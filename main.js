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
function loadFile(e){
var fs = require('fs');
var data = fs.readFileSync(e, 'utf8');
var contents = JSON.parse(data);
return contents;
}
//myBoard.printBoard();
/**
 * Driver function.  "main" method, if you will.
 */
function start(){
 	// Local variables
 //	let p=0;let myBoard = new board(height, width);
//	let turns=["4 3","5 3","6 3","5 2","6 5","5 6"];
let height=4;
let width=4;
let myBoard=new board(4,4);
let load = prompt("Enter l to load a board from a file or x to choose make your own: ");
if(load == 'l'){
  let file = prompt("Enter the full filename path you wish to load an object from: ");
  let contents =  loadFile(file);
  myBoard = new board(contents.height, contents.width);
  height = contents.height;
  width = contents.width
  myBoard.board = contents.board;
}else{
   height = prompt('What height for your board? ');
   width = prompt('What width for your board? ');
	//height=8;
	//width=8;
	// SYNCHRONOUSLY read from keyboard
	console.log('Creating a board with size ' + height + ' x ' + width + '.');
	// Create new board object
	myBoard = new board(height, width);
}

  let disc = prompt('What color B or W? ');	// disc color selected by start player
	//disc='B';Congraduations
	// Print board

  // Loop, asking user input, calling appropriate functions.
while(myBoard.isGameOver()){
  myBoard.printBoard();
  if(!myBoard.isValidMoveAvailable(disc)) {
			console.log("No valid moves available for player. You lose your turn.");
			  disc=(disc=='B' ? 'W':'B');
	}
  else{

  let input = prompt("It's "+disc+"'s turn where do you want to move x (space) y (or enter s to save): ");

  if(input == 's') {
	let file = prompt("Enter the full filename path we want to save to: ");
	saveFile(file, myBoard);
	continue;
  }

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
  console.log("Congratulations "+myBoard.checkWinner()+" won the game ");
	// Save board example code.
	saveFile("test.json", myBoard);
}

console.clear();
start();
