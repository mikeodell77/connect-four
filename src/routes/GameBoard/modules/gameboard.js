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

    const oldGrid = state.grid

    // we need a deep copy of the grid, to retain
    // old values
    let newGrid = oldGrid.map((arr) => {
      return arr.slice(0)
    })

    const currentPlayer = state.currentPlayer
    const nextPlayer = currentPlayer === RED ? BLUE : RED
    // in the newly cloned array, update the value
    const pieceValue = currentPlayer === RED ? 1 : 2
    newGrid[action.payload.columnIndex][action.payload.rowIndex] = pieceValue


    return { ...state, grid: newGrid, currentPlayer: nextPlayer}
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
