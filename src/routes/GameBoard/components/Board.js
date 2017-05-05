import React from 'react'
import './Board.scss'
import Piece from './Piece'

export const Board = (props) => {
  const newGrid = props.grid

  let message = () => {
    if (props.message) {
      return (
        <div id='error'>
          <h4>{props.message}</h4>
        </div>
      )
    }
  }

  let currentPlayer = () => {
    let currentPlayer = ''
    if (!props.gameover) {
      currentPlayer = props.currentPlayer.toUpperCase()
    }
    return (
      <h4>Current Turn is: {currentPlayer}</h4>
    )
  }
  /**
  * Build out an empty board
  **/
  let buildGameBoard = () => {
    return (
      <div className='connect-container'>
        {newGrid.map((column, y) => {
          return (
            <div className='columns' key={`column-${y}`}>
              {column.map((cell, x) => {
                return (
                  <Piece
                    key={`piece-${x}-${y}`}
                    x={x}
                    y={y}
                    addPiece={props.addPiece}
                    currentPlayer={props.currentPlayer}
                    grid={props.grid}
                    insertedPieces={props.insertedPieces}
                    gameover={props.gameover}
                   />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      {message()}
      {currentPlayer()}
      {buildGameBoard()}
    </div>
  )
}

Board.propTypes = {
  grid: React.PropTypes.array,
  message: React.PropTypes.string,
  gameover: React.PropTypes.bool,
  currentPlayer: React.PropTypes.string
}

export default Board
