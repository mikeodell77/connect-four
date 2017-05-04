import update from 'react-addons-update';
import Win from '../components/connectfour'

// ------------------------------------
// Constants
// ------------------------------------
// export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
// export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const ADD_PIECE = 'ADD_PIECE'
export const INITIALIZE_GAME = 'INITIALIZE_GAME'

export const RED = 'red'
export const BLUE = 'blue'
export const MAX_PIECES = 42

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
    dispatch({
      type: ADD_PIECE,
      payload: { columnIndex: columnIndex, rowIndex: rowIndex, currentPlater: player }
    })
  }
}

export const initializeGame = () => {
  return (dispatch, getState) => {
    dispatch({
      type: INITIALIZE_GAME
    })
  }
}

export const actions = {
  addPiece,
  initializeGame
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INITIALIZE_GAME] : (state, action) => {
    return { ...state, grid: NEW_GRID, currentPlayer: RED, message: '', insertedPieces: 0 }
  },
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
    let insertedPieces = state.insertedPieces

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

      // increment total inserted pieces
      insertedPieces = insertedPieces + 1
    } else {
      message = 'There are no more slots left in this column. Please pick another column.'
    }

    // check for a winner!
    if ( Win(newGrid) ) {
      message = 'We have a winner!!!!'
    }

    if ( insertedPieces === MAX_PIECES ) {
      message = 'TIE'
    }

    return { ...state, grid: newGrid, currentPlayer: nextPlayer, message: message, insertedPieces: insertedPieces }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { grid: NEW_GRID, currentPlayer: RED, insertedPieces: 0 }
export function gameboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
