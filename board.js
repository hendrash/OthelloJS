/**
 * Board
 * Defines a board "class" for an Othello game.
 */
module.exports = class Board {
	/**
	 * Construct the object with required state takes in a hight and a width
	 */
	constructor(height, width){
		this.height = height;
		this.width = width;
		this.board = [];
		for(let i=0; i<this.height; ++i){
			let tmp = [];
			for(let j=0; j<this.width; ++j){
				tmp.push(-1);
			}
			this.board.push(tmp);
		}
		let mh = Math.floor((height-1)/2);
		let mw= Math.floor((width-1)/2);
		//sets up the board
		this.board[mh][mw]='W';
		this.board[mh+1][mw+1]='W';
		this.board[mh+1][mw]='B';
		this.board[mh][mw+1]='B';

	}
	/**
	 * Print a representation of the board to the terminal.
	 */
	printBoard(){

		for(let k=0;k<this.width;k++){
			process.stdout.write((k+1)+"\t");
		}
		console.log();
		for(let i=0; i<this.height; ++i){
			process.stdout.write((i+1)+"|");
			for(let j=0; j<this.width; ++j){
				if(this.board[i][j] == -1){
					process.stdout.write('.\t');
					//process.stdout.write((i+1)+""+(j+1)+ '\t');
				} else {
					process.stdout.write(this.board[i][j] + "\t")
				}
			}
			console.log();
		}
	}

	/**
	 * isValidMove
	 * @param row An integer row number.
	 * @param col An integer column number.
	 * @param disc A character for the disc color.
	 * @return A boolean indicating whether the move is valid.
	 * 
	 * Places the player in a spot and flips the opponents tokens
	 */

	isValid(row, col, disc){
		return this.flip(row,col,disc,true);
	}

	/**
	 * checks if a move is valid if not how many disc should be flipped in a specific direction 
	 * @param row an integer row number
	 * @param col an integer column number
	 * @param disc A character for the disc color
	 * @param flag boolean option for changing the board checking for an avaliable move verses seeing if this move is avaliable 
	 * @return returns true or false
	 */
	flip(row,col,disc,flag){
		// for out of bounds
		let result=false;
		if(row > (this.height-1) || col > (this.width-1) || row < 0 || col < 0){
			return false;
		}
		if(this.board[row][col] == this.opp(disc) || this.board[row][col] == disc){
			return false;
		}
		//checks around the board
		for(let i =0;i<3;i++){
			for(let j=0;j<3;j++){
				if(row+i%3-1>=0&&col+j%3-1>=0&&col+j%3-1<this.width&&row+i%3-1<this.height)
					if(this.checkboard(i%3-1,j%3-1, disc,row,col,flag)){
						// are there more then one row of tokens that get flipped
						if(!flag){return true;}
						result=true;}
			}
		}
		return result;
	}

	/**
	 *
	 * Checks a path to see how many disc to flip in a specific path 
	 * @param h hight direction
	 * @param v vertical direction
	 * @param disc the current disc b or w
	 * @param row the current row
	 * @param col the current col
	 * @param flag flip the disc?
	 * @return returns true if the the board should be modified.
	 * **/
	checkboard(h, v, disc, row, col, flag){
		let x=h;
		let y=v;
		while(this.checkD(row+x,col+y,disc)==1){
			x=h+x;
			y=v+y;}
		if((x !=h || y !=v) &&this.checkD(row+x,col+y,disc)==0){
			if(flag){
				do{
					x=x-h;
					y=y-v;
					this.board[row+x][col+y]=disc;
				}while(x!=h||y!=v);
				return true;
			}else{ if(x!=h||y!=v)return true;}
		}

		return false;
	}

	//***************************************************
	// checks the current position and returns
	// 0 for player, 1 for opponent, 2 for neither
	// @param r the row to check
	// @param c the column to check
	// @param disc the players disc color
	//***************************************************
	checkD(r, c, disc){
		if(r > (this.height-1) || c > (this.width-1) || r < 0 || c < 0){
			return 2;
		}
		if(this.board[r][c] == disc){
			return 0;
		}
		if(this.board[r][c] == this.opp(disc)){
			return 1;
		}
		if(this.board[r][c] == -1){
			return 2;
		}
		// out of bounds

		return 2;
	}

	//***************************************************
	// Opponent of current player
	// @param p the current players disc color
	// @return char
	//***************************************************
	opp(p){
		if(p == 'B'){
			return 'W';
		}else{
			return 'B';
		}
	}


	/**
	 * placeDiscAt
	 * @param row An integer number for row.
	 * @param col An integer number for column.
	 * @param disc A character standing for disc color.
	 */
	placeDiskAt(row, col, disc){
		this.board[row][col]=disc;
	}/**
	  * isValidMoveAvailable
	  * @param disc A character pertaining to a disc color.
	  * @return bool A boolean telling the user whether there are
	  *	 	valid moves availabe for that disc.
	  */
	isValidMoveAvailable(disc){
		for(let r=0;r<this.height;r++){
			for(let c=0;c<this.width;c++){
				if(this.flip(r,c,disc,false)){return true;}
			}}
		return false;
	}

	/**
	 * isBoardFull
	 * @return boolean Whether or not the board is full.
	 */
	isBoardFull(){
		for(let i =0;i<this.height;i++){
			for(let j=0;j<this.width;j++){
				if(this.board[i][j]==-1){
					return false;}
			}}
		return true;
	}

	/**
	 * isGameOver
	 * @return bool Whether or not the game is over.
	 */
	isGameOver(){
		for(let r=0;r<this.height;r++){
			for(let c=0;c<this.width;c++){
				if(this.flip(r,c,'B',false))return true;				
				if(this.flip(r,c,'W',false))return true;}
		}
		return false;
	}

	/**
	 * checkWinner
	 * @return char Which player has won.  Return null if
	 * a tie exists.
	 */
	checkWinner(){
		let w=0;
		let b=0;
		for(let r=0;r<this.height;r++){
			for(let c=0;c<this.width;c++){
				if(this.board[r][c]=='W')
					w++;
				if(this.board[r][c]=='B')
					b++;
			}
		}

		return b < w? "W":"B";
	}
}

