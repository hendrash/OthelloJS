/*
 * Game of Life
 *
 * A version of John Conway's classic Game of Life, written in C.
 * CIS 343 - Winter 2019
 *
 * Author:  Jake Miller & Ashley Hendrickson
 */

const prompt = require('prompt-sync')();

/*
 * Main method
 */
function start(){
let contents = readF();
let x = contents.height;
let y = contents.width;

let grid = initializeB(contents, x, y);
userIn(grid, x, y, contents);
}

/*
 * @param x the height
 * @param y the width
 * @param grid the grid
 *
 * printB attempts to print out the grid of x and y
 * */
function printB(grid, x, y){
	console.log("\n");
	console.log(grid);
	console.log("\n");
}

/*
 * @param x the height
 * @param y the width
 * @param contents the object grid loaded from the file
 * @return grid
 *
 * initializeB initializes the board
 * */
function initializeB(contents, x, y){
		 let grid = [];
		 for(let i=0; i<x; ++i){
			let tmp = [];
			for(let j=0; j<y; ++j){
				tmp.push(-1);
			}
			grid.push(tmp);
		}

     grid = contents.board;

		 console.log("Beggining with grid size " +x+ ", "+y+"\n\n");
		 printB(grid, x, y);

     return grid;
}

/*
 * @return contents
 *
 * readF reads in the contents from the file
 * */
function readF(){
let e = prompt("Enter the filename: ");

var fs = require('fs');
var data = fs.readFileSync(e, 'utf8');
var contents = JSON.parse(data);
return contents;
}

/*
 * @param x the height
 * @param y the width
 * @param board the game board
 * @param contents the contents loaded from the file
 *
 * Takes user input and calls appropiate helper methods
 * */
function userIn(board, x, y, contents){
  let grid = board;
  // Now, we will accept input in a loop until the user
	// asks us to quit.
	while(1){

		console.log("Press q to quit, w to save to disk,\n");
		console.log("n to iterate multple times, or any other\n");
		console.log("key to continue to the next generation.\n");
		let fn = prompt();
		console.log("-------------------------\n");

		switch(fn){

			case 'q':
				// Case 'q' results in exiting the game.  We must free
				// our memory here.
				//free(grid);
				return 0;

			case 'w':
				// Case 'w' writes the current board to disk.  Since
				// a file is just a string of bytes, we must first
				// convert our grid to some representation that is
				// a string of bytes.  We will use the representation
				// described in the top of this file.
				let file = prompt("Enter a filename: ");
        let fs = require('fs');
        contents.board = grid;
	      fs.writeFileSync(file, JSON.stringify(contents));

				break;

			case 'n':
				// 'n' causes us to ask the user how
				// many evolutions to perform in a row,
				// then executes them in a loop.
				let num = prompt("How many iterations? ");

				console.log("Iterating "+num+" times. ");
				for(let i=0; i<num; ++i){
					grid = mutate(x, y, grid);
					printB(grid, x, y);
				}
				break;

			default:
				// Any other key and we evolve one iteration,
				// print, and keep going.
				grid = mutate(x, y, grid);
				printB(grid, x, y);
		}
	}
}

/*
 * @param x the height
 * @param y the width
 * @param grid the game Grid
 * @return the updated game grid.
 *
 * mutate takes a grid and mutates that grid
 * according to Conway's rules.  A new grid
 * is returned.
 */
function mutate(x, y, grid){
  let future = [];

  for(let i=0; i<x; ++i){
   let tmp = [];
   for(let j=0; j<y; ++j){
     tmp.push(-1);
   }
   future.push(tmp);
 }

  	// Loop through every cell
        for (let l = 0; l < x; l++)
        {
            for (let m = 0; m < y; m++)
            {
                // Implementing the Rules of Life

                // Cell is lonely and dies
                if ((grid[l][m] == 1) && (get_neighbors(l, m, x, y, grid) < 2))
                    future[l][m] = 0;

                // Cell dies due to over population
                else if ((grid[l][m] == 1) && (get_neighbors(l, m, x, y, grid) > 3))
                    future[l][m] = 0;

                // A new cell is born
                else if ((grid[l][m] == 0) && (get_neighbors(l, m, x, y, grid) == 3))
                    future[l][m] = 1;

                // Remains the same
                else
                    future[l][m] = grid[l][m];
            }
        }
	return future;
}

/*
 * @param i x pos
 * @param j y pos
 * @param x the height
 * @param y the width
 * @param grid the game grid
 * @return count the number of neighbors a cell has
 *
 * get_neighbors is a helper method that returns
 * the number of live neighbors a cell has.
 */
function get_neighbors(i, j, x, y, grid){
	if(i >= 0 && i < x && j >= 0 && j < y){

		let count = 0;
		if(grid[i][(j+1)%y] == 1){
			count++;
		}
		if(grid[i][(y+j-1)%y] == 1){
			count++;
		}
		if(grid[(i+1)%x][j] == 1){
			count++;
		}
		if(grid[(x+i-1)%x][j] == 1){
			count++;
		}
		if(grid[(i+1)%x][(j+1)%y] == 1){
			count++;
		}
		if(grid[(x+i-1)%x][(j+1)%y] == 1){
			count++;
		}
		if(grid[(x+i-1)%x][(y+j-1)%y] == 1){
			count++;
		}
		if(grid[(i+1)%x][(y+j-1)%y] == 1){
			count++;
		}
		return count;
	}
	console.log("Out of bounds!");
	return -1;
}
start();
