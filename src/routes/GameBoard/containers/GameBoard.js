import { connect } from 'react-redux'
import { addPiece } from '../modules/gameboard'

import Board from '../components/Board'

const mapDispatchToProps = {
  addPiece
}

const mapStateToProps = (state) => ({
  grid: state.gameboard.grid,
  currentPlayer: state.gameboard.currentPlayer,
  message: state.gameboard.message
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
