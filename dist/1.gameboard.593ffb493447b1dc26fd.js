webpackJsonp([1],{

/***/ 394:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(360);
	
	var _gameboard = __webpack_require__(395);
	
	var _Board = __webpack_require__(407);
	
	var _Board2 = _interopRequireDefault(_Board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapDispatchToProps = {
	  addPiece: _gameboard.addPiece
	};
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    grid: state.gameboard.grid,
	    currentPlayer: state.gameboard.currentPlayer,
	    message: state.gameboard.message,
	    insertedPieces: state.gameboard.insertedPieces
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Board2.default);

/***/ },

/***/ 395:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actions = exports.initializeGame = exports.addPiece = exports.MAX_PIECES = exports.BLUE = exports.RED = exports.INITIALIZE_GAME = exports.ADD_PIECE = undefined;
	
	var _defineProperty2 = __webpack_require__(396);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends2 = __webpack_require__(280);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _ACTION_HANDLERS;
	
	exports.gameboardReducer = gameboardReducer;
	
	var _reactAddonsUpdate = __webpack_require__(397);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _connectfour = __webpack_require__(398);
	
	var _connectfour2 = _interopRequireDefault(_connectfour);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// ------------------------------------
	// Constants
	// ------------------------------------
	// export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
	// export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
	var ADD_PIECE = exports.ADD_PIECE = 'ADD_PIECE';
	var INITIALIZE_GAME = exports.INITIALIZE_GAME = 'INITIALIZE_GAME';
	
	var RED = exports.RED = 'red';
	var BLUE = exports.BLUE = 'blue';
	var MAX_PIECES = exports.MAX_PIECES = 42;
	
	var NEW_GRID = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
	
	// ------------------------------------
	// Actions
	// ------------------------------------
	
	
	/*  This is a thunk, meaning it is a function that immediately
	    returns a function for lazy evaluation. It is incredibly useful for
	    creating async actions, especially when combined with redux-thunk! */
	var addPiece = exports.addPiece = function addPiece(columnIndex, rowIndex, player) {
	  return function (dispatch, getState) {
	    dispatch({
	      type: ADD_PIECE,
	      payload: { columnIndex: columnIndex, rowIndex: rowIndex, currentPlater: player }
	    });
	  };
	};
	
	var initializeGame = exports.initializeGame = function initializeGame() {
	  return function (dispatch, getState) {
	    dispatch({
	      type: INITIALIZE_GAME
	    });
	  };
	};
	
	var actions = exports.actions = {
	  addPiece: addPiece,
	  initializeGame: initializeGame
	};
	
	// ------------------------------------
	// Action Handlers
	// ------------------------------------
	var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, INITIALIZE_GAME, function (state, action) {
	  return (0, _extends3.default)({}, state, { grid: NEW_GRID, currentPlayer: RED, message: '', insertedPieces: 0 });
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, ADD_PIECE, function (state, action) {
	
	  // we need a deep copy of the grid, to retain
	  // old values
	  var newGrid = state.grid.map(function (arr) {
	    return arr.slice(0);
	  });
	
	  // if we are able to place a piece, this will
	  // be updated. Otherwise, it stays
	  var nextPlayer = state.currentPlayer;
	  var message = '';
	  var insertedPieces = state.insertedPieces;
	
	  /**
	  * We actually want to put the 'piece' at the bottom of the colomn.
	  * loop through the rows for the selected column. find the first one
	  * that has been selected and backup one.
	  */
	  var column = newGrid[action.payload.columnIndex];
	  var cellIndex = -1;
	
	  column.forEach(function (columnPiece, i) {
	    if (columnPiece === 0) {
	      cellIndex = i;
	    }
	  });
	
	  if (cellIndex >= 0) {
	    // we have successfully placed a piece, so toggle the next player
	    nextPlayer = nextPlayer === RED ? BLUE : RED;
	    var pieceValue = state.currentPlayer === RED ? 1 : 2;
	    column[cellIndex] = pieceValue;
	
	    // increment total inserted pieces
	    insertedPieces = insertedPieces + 1;
	  } else {
	    message = 'There are no more slots left in this column. Please pick another column.';
	  }
	
	  // check for a winner!
	  if ((0, _connectfour2.default)(newGrid)) {
	    message = 'We have a winner!!!!';
	  }
	
	  if (insertedPieces === MAX_PIECES) {
	    message = 'TIE';
	  }
	
	  return (0, _extends3.default)({}, state, { grid: newGrid, currentPlayer: nextPlayer, message: message, insertedPieces: insertedPieces });
	}), _ACTION_HANDLERS);
	
	// ------------------------------------
	// Reducer
	// ------------------------------------
	var initialState = { grid: NEW_GRID, currentPlayer: RED, insertedPieces: 0 };
	function gameboardReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  var handler = ACTION_HANDLERS[action.type];
	
	  return handler ? handler(state, action) : state;
	}

/***/ },

/***/ 396:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(311);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },

/***/ 397:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(30);
	var hasOwnProperty = {}.hasOwnProperty;
	
	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return Object.assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}
	
	var COMMAND_PUSH = '$push';
	var COMMAND_UNSHIFT = '$unshift';
	var COMMAND_SPLICE = '$splice';
	var COMMAND_SET = '$set';
	var COMMAND_MERGE = '$merge';
	var COMMAND_APPLY = '$apply';
	
	var ALL_COMMANDS_LIST = [
	  COMMAND_PUSH,
	  COMMAND_UNSHIFT,
	  COMMAND_SPLICE,
	  COMMAND_SET,
	  COMMAND_MERGE,
	  COMMAND_APPLY,
	];
	
	var ALL_COMMANDS_SET = {};
	
	ALL_COMMANDS_LIST.forEach(function(command) {
	  ALL_COMMANDS_SET[command] = true;
	});
	
	function invariantArrayCase(value, spec, command) {
	  invariant(
	    Array.isArray(value),
	    'update(): expected target of %s to be an array; got %s.',
	    command,
	    value
	  );
	  var specValue = spec[command];
	  invariant(
	    Array.isArray(specValue),
	    'update(): expected spec of %s to be an array; got %s. ' +
	    'Did you forget to wrap your parameter in an array?',
	    command,
	    specValue
	  );
	}
	
	/**
	 * Returns a updated shallow copy of an object without mutating the original.
	 * See https://facebook.github.io/react/docs/update.html for details.
	 */
	function update(value, spec) {
	  invariant(
	    typeof spec === 'object',
	    'update(): You provided a key path to update() that did not contain one ' +
	    'of %s. Did you forget to include {%s: ...}?',
	    ALL_COMMANDS_LIST.join(', '),
	    COMMAND_SET
	  );
	
	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    invariant(
	      Object.keys(spec).length === 1,
	      'Cannot have more than one key in an object with %s',
	      COMMAND_SET
	    );
	
	    return spec[COMMAND_SET];
	  }
	
	  var nextValue = shallowCopy(value);
	
	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    invariant(
	      mergeObj && typeof mergeObj === 'object',
	      'update(): %s expects a spec of type \'object\'; got %s',
	      COMMAND_MERGE,
	      mergeObj
	    );
	    invariant(
	      nextValue && typeof nextValue === 'object',
	      'update(): %s expects a target of type \'object\'; got %s',
	      COMMAND_MERGE,
	      nextValue
	    );
	    Object.assign(nextValue, spec[COMMAND_MERGE]);
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function(item) {
	      nextValue.push(item);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function(item) {
	      nextValue.unshift(item);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    invariant(
	      Array.isArray(value),
	      'Expected %s target to be an array; got %s',
	      COMMAND_SPLICE,
	      value
	    );
	    invariant(
	      Array.isArray(spec[COMMAND_SPLICE]),
	      'update(): expected spec of %s to be an array of arrays; got %s. ' +
	      'Did you forget to wrap your parameters in an array?',
	      COMMAND_SPLICE,
	      spec[COMMAND_SPLICE]
	    );
	    spec[COMMAND_SPLICE].forEach(function(args) {
	      invariant(
	        Array.isArray(args),
	        'update(): expected spec of %s to be an array of arrays; got %s. ' +
	        'Did you forget to wrap your parameters in an array?',
	        COMMAND_SPLICE,
	        spec[COMMAND_SPLICE]
	      );
	      nextValue.splice.apply(nextValue, args);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    invariant(
	      typeof spec[COMMAND_APPLY] === 'function',
	      'update(): expected spec of %s to be a function; got %s.',
	      COMMAND_APPLY,
	      spec[COMMAND_APPLY]
	    );
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }
	
	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }
	
	  return nextValue;
	}
	
	module.exports = update;


/***/ },

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _verticalWin = __webpack_require__(399);
	
	var _verticalWin2 = _interopRequireDefault(_verticalWin);
	
	var _horizontalWin = __webpack_require__(405);
	
	var _horizontalWin2 = _interopRequireDefault(_horizontalWin);
	
	var _diagonalWin = __webpack_require__(406);
	
	var _diagonalWin2 = _interopRequireDefault(_diagonalWin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Win(grid) {
	  return (0, _verticalWin2.default)(grid) || (0, _horizontalWin2.default)(grid) || (0, _diagonalWin2.default)(grid);
	}
	
	exports.default = Win;

/***/ },

/***/ 399:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getIterator2 = __webpack_require__(400);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function verticalWin(grid) {
	  var found = 0;
	  var foundPiece = 0;
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _getIterator3.default)(grid), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var column = _step.value;
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(column), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var piece = _step2.value;
	
	
	          // if the piece hasn't been played (value = 0)
	          // reset and keep moving
	          if (piece === 0) {
	            found = 0;
	            foundPiece = 0;
	            continue;
	          }
	
	          if (piece !== foundPiece) {
	            found = 1;
	            foundPiece = piece;
	            continue;
	          }
	
	          found++;
	
	          if (found >= 4) {
	            return true; // winner winner chicken dinner
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return false; // no winners here!
	}
	
	exports.default = verticalWin;

/***/ },

/***/ 400:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(401), __esModule: true };

/***/ },

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(329);
	__webpack_require__(318);
	module.exports = __webpack_require__(402);

/***/ },

/***/ 402:
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(12)
	  , get      = __webpack_require__(403);
	module.exports = __webpack_require__(7).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },

/***/ 403:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(404)
	  , ITERATOR  = __webpack_require__(328)('iterator')
	  , Iterators = __webpack_require__(323);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(23)
	  , TAG = __webpack_require__(328)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },

/***/ 405:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function horizontalWin(grid) {
	  var ROWS_NUM = 6;
	  var COLUMNS_NUM = 7;
	
	  var found = 0;
	  var foundPiece = 0;
	
	  for (var x = 0; x < ROWS_NUM; x++) {
	    for (var y = 0; y < COLUMNS_NUM; y++) {
	      var piece = grid[y][x];
	
	      if (piece === 0) {
	        found = 0;
	        foundPiece = 0;
	        continue;
	      }
	
	      if (piece !== foundPiece) {
	        found = 1;
	        foundPiece = piece;
	        continue;
	      }
	
	      found++;
	
	      if (found >= 4) {
	        return true; // nailed it!
	      }
	    }
	  }
	  return false; // Loser
	}
	
	exports.default = horizontalWin;

/***/ },

/***/ 406:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MATCH_REQ = 4;
	var COLUMNS_NUM = 7;
	var ROWS_NUM = 6;
	
	function diagonalWin(grid) {
	  return isTopRight(grid) || isTopLeft(grid);
	}
	
	function isTopLeft(grid) {
	  var found = void 0;
	  var foundPiece = void 0;
	  var column = void 0;
	
	  for (var baseColumn = MATCH_REQ - ROWS_NUM; baseColumn < COLUMNS_NUM - (MATCH_REQ - 1); baseColumn++) {
	    found = 0;
	    foundPiece = 0;
	    column = baseColumn - 1;
	
	    for (var row = 0; row < ROWS_NUM; row++) {
	      column++;
	
	      if (column >= 0 && column < COLUMNS_NUM && row < ROWS_NUM) {
	        var piece = grid[column][row];
	
	        if (!piece) {
	          found = 0;
	        }
	
	        if (!!piece && (piece === foundPiece || !foundPiece) && ++found === MATCH_REQ) {
	          return true;
	        }
	
	        foundPiece = piece;
	      }
	    }
	  }
	
	  return false;
	}
	
	function isTopRight(grid) {
	
	  var found = void 0;
	  var foundPiece = void 0;
	  var col = void 0;
	
	  // Here, we take successive diagonals, defined by the location of their "base",
	  // meaning the column where they meet the ground.
	  // The initial baseCol is a negative number, representing that the diagonal starts off
	  // the board. These diagonals intersect the board, nonetheless.
	  for (var baseCol = MATCH_REQ - ROWS_NUM; baseCol < COLUMNS_NUM - (MATCH_REQ - 1); baseCol++) {
	
	    found = 0;
	    foundPiece = 0;
	    col = baseCol - 1; // Subtracting 1 to compensate for incrementing col at
	    // the beginning of the loop
	
	    // Here we work our way *DOWN* the current diagonal
	    for (var row = ROWS_NUM - 1; row >= 0; row--) {
	      col++;
	
	      // Ensure that the given column and row are on the board
	      if (col >= 0 && col < COLUMNS_NUM && row < ROWS_NUM) {
	
	        var piece = grid[col][row];
	
	        if (!piece) {
	          found = 0;
	        }
	
	        if (!!piece && (piece === foundPiece || !foundPiece) && ++found === MATCH_REQ) {
	          return true;
	        }
	
	        foundPiece = piece;
	      }
	    }
	  }
	
	  return false;
	}
	
	exports.default = diagonalWin;

/***/ },

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Board = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(408);
	
	var _Piece = __webpack_require__(410);
	
	var _Piece2 = _interopRequireDefault(_Piece);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Board = exports.Board = function Board(props) {
	
		var new_grid = props.grid;
	
		var message = function message() {
			if (props.message) {
				return _react2.default.createElement(
					'div',
					{ id: 'error' },
					_react2.default.createElement(
						'h4',
						null,
						props.message
					)
				);
			}
		};
	
		var currentPlayer = function currentPlayer() {
			return _react2.default.createElement(
				'h4',
				null,
				props.currentPlayer.toUpperCase()
			);
		};
		/**
	 * Build out an empty board
	 **/
		var buildGameBoard = function buildGameBoard() {
			return _react2.default.createElement(
				'div',
				{ className: 'connect-container' },
				new_grid.map(function (column, y) {
					return _react2.default.createElement(
						'div',
						{ className: 'columns', key: 'column-' + y },
						column.map(function (cell, x) {
							return _react2.default.createElement(_Piece2.default, {
								key: 'piece-' + x + '-' + y,
								x: x,
								y: y,
								addPiece: props.addPiece,
								currentPlayer: props.currentPlayer,
								grid: props.grid,
								insertedPieces: props.insertedPieces
							});
						})
					);
				})
			);
		};
	
		return _react2.default.createElement(
			'div',
			null,
			message(),
			currentPlayer(),
			buildGameBoard()
		);
	};
	
	exports.default = Board;

/***/ },

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(409);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(383)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(409, function() {
				var newContent = __webpack_require__(409);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(382)();
	// imports
	
	
	// module
	exports.push([module.id, ".piece{background:#eee;border-radius:50%;border:none;color:#333;cursor:pointer;display:inline-block;font-size:12px;height:80px;margin:10px auto;outline:none;padding:0;text-align:center;text-decoration:none;vertical-align:middle;width:80px}.piece-color-red{background-color:#801515}.piece-color-blue{background-color:#231858}.columns{float:left;width:14.28571%}.connect-container{width:976px}.piece-hover{background-color:#ddd}#error h4{color:red}", "", {"version":3,"sources":["/./src/routes/GameBoard/components/src/routes/GameBoard/components/Board.scss"],"names":[],"mappings":"AAOA,OACC,gBAPmB,kBAQD,YACN,WACD,eACI,qBACM,eACN,YACH,iBACK,aACJ,UACH,kBACQ,qBACG,sBACC,UACX,CACX,iBAGA,wBAvBwB,CAwBxB,kBAGA,wBA1ByB,CA2BzB,SAGA,WAAW,eACc,CACzB,mBAGA,WAAY,CACZ,aAIA,qBA1CyB,CA2CzB,UAGA,SA3CoB,CA4CpB","file":"Board.scss","sourcesContent":["$numColumns: 7;\r\n$cell-empty: #eeeeee;\r\n$cell-empty-hover: #dddddd;\r\n$cell-player-red: #801515;\r\n$cell-player-blue: #231858;\r\n$error-color: #ff0000;\r\n\r\n.piece {\r\n\tbackground: $cell-empty;\r\n\tborder-radius: 50%;\r\n\tborder: none;\r\n\tcolor: #333;\r\n\tcursor: pointer;\r\n\tdisplay: inline-block;\r\n\tfont-size: 12px;\r\n\theight: 80px;\r\n\tmargin: 10px auto;\r\n\toutline: none;\r\n\tpadding: 0;\r\n\ttext-align: center;\r\n\ttext-decoration: none;\r\n\tvertical-align: middle;\r\n\twidth: 80px;\r\n}\r\n\r\n.piece-color-red {\r\n\tbackground-color: $cell-player-red;\r\n}\r\n\r\n.piece-color-blue {\r\n\tbackground-color: $cell-player-blue;\r\n}\r\n\r\n.columns {\r\n\tfloat: left;\r\n\twidth: 100% / $numColumns;\r\n}\r\n\r\n.connect-container {\r\n\twidth: 976px;\r\n}\r\n\r\n\r\n.piece-hover {\r\n\tbackground-color: $cell-empty-hover;\r\n}\r\n\r\n#error h4{\r\n\tcolor: $error-color;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Piece = undefined;
	
	var _react = __webpack_require__(24);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(411);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	__webpack_require__(408);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Piece = exports.Piece = function Piece(props) {
	
		var handleAddPiece = function handleAddPiece() {
			var columnIndex = props.y;
			var rowIndex = props.x;
			var currentPlayer = props.currentPlayer;
			props.addPiece(columnIndex, rowIndex, currentPlayer);
		};
	
		var cellClasses = (0, _classnames2.default)({
			'piece': true,
			'piece-color-red': props.grid[props.y][props.x] == 1 ? true : false,
			'piece-color-blue': props.grid[props.y][props.x] == 2 ? true : false
		});
	
		return _react2.default.createElement(
			'button',
			{
				className: cellClasses,
				id: 'piece-' + props.x + '-' + props.y,
				onClick: function onClick(e) {
					return handleAddPiece();
				} },
			props.grid[props.y][props.x] > 0 ? 'disabled' : ''
		);
	};
	
	Piece.propTypes = {
		addPiece: _react2.default.PropTypes.func.isRequired,
		x: _react2.default.PropTypes.number.isRequired,
		y: _react2.default.PropTypes.number.isRequired
	};
	
	exports.default = Piece;

/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }

});
//# sourceMappingURL=1.gameboard.593ffb493447b1dc26fd.js.map