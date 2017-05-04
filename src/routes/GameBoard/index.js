import { injectReducer } from '../../store/reducers'

export default (store) => ({
	path: 'gameboard',
	getComponent (nextState, cb) {
		require.ensure([], (require) => {
			const GameBoard = require('./containers/GameBoard').default

			const actions = require('./modules/gameboard').actions
			const reducer = require('./modules/gameboard').gameboardReducer

			injectReducer(store, { key: 'gameboard', reducer })

			store.dispatch(actions.initializeGame())

			cb(null, GameBoard)
		}, 'gameboard')
	}
})
