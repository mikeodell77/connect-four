import React from 'react'
import './Board.scss'
import Piece from './Piece'

export const Board = (props) => {

	const new_grid = props.grid

	let message = () => {
		if (props.message) {
			return (
				<div id="error">
					<h4>{props.message}</h4>
				</div>
			)
		}
	}

	let currentPlayer = () => {
		return (
			<h4>{props.currentPlayer.toUpperCase()}</h4>
		)
	}
	/**
	* Build out an empty board
	**/
	let buildGameBoard = () => {
		return (
				<div className="connect-container">
					{new_grid.map((column, y) => {
						return (
							<div className="columns" key={`column-${y}`}>
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

export default Board
