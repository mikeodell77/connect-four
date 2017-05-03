import update from 'react-addons-update';

// ------------------------------------
// Constants
// ------------------------------------
// export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
// export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const ADD_PIECE = 'ADD_PIECE'
export const RED = 'red'
export const BLUE = 'blue'

const NEW_GRID = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0]
]

// ------------------------------------
// Actions
// ------------------------------------


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const addPiece = (columnIndex, rowIndex, player) => {
  return (dispatch, getState) => {
    console.log('We are adding pieces!')
    console.log('What is column index : ', columnIndex)
    console.log('What is piece : ', rowIndex)

    dispatch({
      type: ADD_PIECE,
      payload: { columnIndex: columnIndex, rowIndex: rowIndex, currentPlater: player }
    })
  }
}
// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch({
//           type    : COUNTER_DOUBLE_ASYNC,
//           payload : getState().counter
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }

export const actions = {
  addPiece
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_PIECE] : (state, action) => {

    // we need a deep copy of the grid, to retain
    // old values
    let newGrid = state.grid.map((arr) => {
      return arr.slice(0)
    })

    // if we are able to place a piece, this will
    // be updated. Otherwise, it stays
    let nextPlayer = state.currentPlayer
    let message = ''

    /**
    * We actually want to put the 'piece' at the bottom of the colomn.
    * loop through the rows for the selected column. find the first one
    * that has been selected and backup one.
    */
    let column = newGrid[action.payload.columnIndex]
    let cellIndex = -1

    column.forEach((columnPiece, i) => {
      if (columnPiece === 0) {
        cellIndex = i
      }
    })

    if (cellIndex >= 0) {
      // we have successfully placed a piece, so toggle the next player
      nextPlayer = nextPlayer === RED ? BLUE : RED
      const pieceValue = state.currentPlayer === RED ? 1 : 2
      column[cellIndex] = pieceValue
    } else {
      message = 'There are no more slots left in this column. Please pick another column.'
    }

    console.log('Found the following open cell : ', cellIndex)

    return { ...state, grid: newGrid, currentPlayer: nextPlayer, message: message}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { grid: NEW_GRID, currentPlayer: RED }
export function gameboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
