import update from 'react-addons-update';

// ------------------------------------
// Constants
// ------------------------------------
// export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
// export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const ADD_PIECE = 'ADD_PIECE'
export const RED = 'RED'
export const BLUE = 'BLUE'

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

    // in the newly cloned array, update the value
    newGrid[action.payload.columnIndex][action.payload.rowIndex] = 1
    const currentPlayer = state.currentPlayer
    const updatedCurrentPlayer = currentPlayer === RED ? BLUE : RED

    return { ...state, grid: newGrid, currentPlayer: updatedCurrentPlayer}
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
