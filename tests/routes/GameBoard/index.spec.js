import GameBoardRoute from 'routes/GameBoard'

describe('(Route) GameBoard', () => {
  let _route

  beforeEach(() => {
    _route = GameBoardRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `gameboard`', () => {
    expect(_route.path).to.equal('gameboard')
  })
})
