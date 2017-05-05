function verticalWin (grid) {
  let found = 0
  let foundPiece = 0

  for (let column of grid) {
    for (let piece of column) {
      // if the piece hasn't been played (value = 0)
      // reset and keep moving
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
        return true // winner winner chicken dinner
      }
    }
  }

  return false // no winners here!
}

export default verticalWin
