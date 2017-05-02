import React from 'react'
import './Board.scss'
import Piece from './Piece'

export const Board = (props) => {

	const new_grid = props.grid

	let currentPlayer = () => {
		return (
			<h4>{props.currentPlayer}</h4>
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
			{currentPlayer()}
			{buildGameBoard()}
		</div>
	)
}

export default Board
