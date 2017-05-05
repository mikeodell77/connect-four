import {
  ADD_PIECE,
  INITIALIZE_GAME,
  RED,
  BLUE,
  MAX_PIECES,
  NEW_GRID,
  addPiece,
  initializeGame,
  default as gameboardReducer
} from 'routes/GameBoard/modules/gameboard'

describe('(Redux Module) GameBoard', () => {
  it('Should export a constant ADD_PIECE.', () => {
    expect(ADD_PIECE).to.equal('ADD_PIECE')
  })

  it('Should export a constant INITIALIZE_GAME.', () => {
    expect(INITIALIZE_GAME).to.equal('INITIALIZE_GAME')
  })

  it('Should export a constant RED.', () => {
    expect(RED).to.equal('red')
  })

  it('Should export a constant BLUE.', () => {
    expect(BLUE).to.equal('blue')
  })

  it('Should export a constant MAX_PIECES.', () => {
    expect(MAX_PIECES).to.equal(42)
  })

  it('Should export a constant NEW_GRID.', () => {
    expect(NEW_GRID).to.deep.equal([[0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]])
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(gameboardReducer).to.be.a('function')
    })

    it('Should initialize with a state of gameboard grid.', () => {
      expect(gameboardReducer(undefined, {})).to.deep.equal(
        {
          grid: NEW_GRID,
          currentPlayer: RED,
          insertedPieces: 0,
          gameover: false
        })
    })
  })

  describe('(Action Creator) increment', () => {
    it('Should be exported as a function.', () => {
      expect(initializeGame).to.be.a('function')
    })

    it('Should be exported as a function.', () => {
      expect(addPiece).to.be.a('function')
    })

    it('Should return an action with type "ADD_PIECE".', () => {
      expect(addPiece()).to.have.property('type', ADD_PIECE)
    })

    it('Should return an action with type "INITIALIZE_GAME".', () => {
      expect(initializeGame()).to.have.property('type', INITIALIZE_GAME)
    })
  })
})
