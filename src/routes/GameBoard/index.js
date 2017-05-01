import { injectReducer } from '../../store/reducers'

export default (store) => ({
	path: 'gameboard',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const GameBoard = require('./containers/GameBoard').default

			const action = require('./modules/gameboard').actions
			const reducer = require('./modules/gameboard').gameboardReducer

			injectReducer(store, { key: 'gameboard', reducer })

			cb(null, GameBoard)
		}, 'gameboard')
	}
})
