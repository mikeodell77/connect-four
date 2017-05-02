import React from 'react'
import './Board.scss'

export const Piece = (props) => {

	let handleAddPiece = () => {
		const columnIndex = props.y
		const rowIndex = props.x
		const currentPlayer = props.currentPlayer
		props.addPiece(columnIndex, rowIndex, currentPlayer)
	}

	return (
		<button
			className="piece piece-hover"
			id={`piece-${props.x}-${props.y}`}
			onClick={(e) => handleAddPiece()}>
		</button>
	)
}

Piece.propTypes = {
	addPiece	: React.PropTypes.func.isRequired,
	x					: React.PropTypes.number.isRequired,
	y					: React.PropTypes.number.isRequired
}

export default Piece
