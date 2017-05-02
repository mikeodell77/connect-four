import React from 'react'
import './Board.scss'

export const Piece = (props) => {
	return (
		<button
			className="piece piece-hover"
			id={`piece-${props.x}-${props.y}`}>
		</button>
	)
}

export default Piece
