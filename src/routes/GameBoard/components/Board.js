import React from 'react'
import './Board.scss'
import Piece from './Piece'

export const Board = (props) => {

	let new_grid = [
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0]
	]

	let buildGameBoard = () => {
		return (
				new_grid.map((column, y) => {
					return (
						<div className="columns" key={`column-${y}`}>
							{column.map((cell, x) => {
								return (
									<Piece
										key={`piece-${x}-${y}`}
										x={x}
										y={y}
									/>
								)
							})}
						</div>
					)
				})

		)
	}

	return (
		<div>
			<h1>Connect Four game board will go here!</h1>
			{buildGameBoard()}
		</div>
	)
}

export default Board
