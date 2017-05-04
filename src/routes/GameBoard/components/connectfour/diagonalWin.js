const MATCH_REQ = 4
const COLUMNS_NUM = 7
const ROWS_NUM = 6

function diagonalWin(grid) {
  return isTopRight(grid) || isTopLeft(grid)
}

function isTopLeft(grid) {
  let found
  let foundPiece
  let column

  for (
    let baseColumn = MATCH_REQ - ROWS_NUM;
    baseColumn < COLUMNS_NUM - (MATCH_REQ -1);
    baseColumn++
  ) {
    found = 0
    foundPiece = 0
    column = baseColumn - 1

    for (let row = 0; row < ROWS_NUM; row++) {
      column++

      if (column >= 0 && column < COLUMNS_NUM && row < ROWS_NUM) {
        let piece = grid[column][row]

        if (!piece) {
          found = 0
        }

        if (!!piece && (piece === foundPiece || !foundPiece) && (++found) === MATCH_REQ) {
          return true
        }

        foundPiece = piece
      }
    }
  }

  return false

}

function isTopRight(grid) {

  let found;
  let foundPiece;
  let col;

  // Here, we take successive diagonals, defined by the location of their "base",
  // meaning the column where they meet the ground.
  // The initial baseCol is a negative number, representing that the diagonal starts off
  // the board. These diagonals intersect the board, nonetheless.
  for (
    let baseCol = MATCH_REQ - ROWS_NUM;
    baseCol < COLUMNS_NUM - (MATCH_REQ - 1);
    baseCol++
  ) {

      found = 0;
      foundPiece = 0;
      col = baseCol - 1; // Subtracting 1 to compensate for incrementing col at
                         // the beginning of the loop

      // Here we work our way *DOWN* the current diagonal
      for (let row = ROWS_NUM - 1; row >= 0; row--) {
        col++;

        // Ensure that the given column and row are on the board
        if (col >= 0 && col < COLUMNS_NUM && row < ROWS_NUM) {

          let piece = grid[col][row];
          console.log('Looking at grid : ', col, ' and row : ', row)
          console.log('What is the value of this grid piece : ', piece)
          if(!piece) {
            found = 0;
          }

          if (!!piece && (piece === foundPiece || !foundPiece) && (++found) === MATCH_REQ) {
            return true;
          }

          foundPiece = piece;

      }
    }
  }

  return false;
}

export default diagonalWin
