import React from 'react'
import classnames from 'classnames'
import './Board.scss'

export const Piece = (props) => {

	let handleAddPiece = () => {
		const columnIndex = props.y
		const rowIndex = props.x
		const currentPlayer = props.currentPlayer
		props.addPiece(columnIndex, rowIndex, currentPlayer)
	}

	let cellClasses = classnames({
		'piece': true,
		'piece-color-red': (props.grid[props.y][props.x] == 1 ? true : false),
		'piece-color-blue': (props.grid[props.y][props.x] == 2 ? true : false)
	})

	return (
		<button
			className={cellClasses}
			id={`piece-${props.x}-${props.y}`}
			onClick={(e) => handleAddPiece()}>
			{props.grid[props.y][props.x] > 0 ? 'disabled' : ''}
		</button>
	)
}

Piece.propTypes = {
	addPiece	: React.PropTypes.func.isRequired,
	x					: React.PropTypes.number.isRequired,
	y					: React.PropTypes.number.isRequired
}

export default Piece
