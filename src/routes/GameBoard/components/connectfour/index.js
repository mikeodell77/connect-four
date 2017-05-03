import verticalWin from './verticalWin'
import horizontalWin from './horizontalWin'
import diagonalWin from './diagonalWin'

function Win(grid) {
  return verticalWin(grid) || horizontalWin(grid) || diagonalWin(grid)
}

export default Win
