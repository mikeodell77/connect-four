function horizontalWin (grid) {
  const ROWS_NUM = 6
  const COLUMNS_NUM = 7

  let found = 0
  let foundPiece = 0

  for (let x = 0; x < ROWS_NUM; x++) {
    for (let y = 0; y < COLUMNS_NUM; y++) {
      let piece = grid[y][x]

      if (piece === 0) {
        found = 0
        foundPiece = 0
        continue
      }

      if (piece !== foundPiece) {
        found = 1
        foundPiece = piece
        continue
      }

      found++

      if (found >= 4) {
        return true // nailed it!
      }
    }
  }
  return false // Loser
}

export default horizontalWin
