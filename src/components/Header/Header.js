import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Amazing Connect Four Game</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/gameboard' activeClassName='route--active'>
      New Game
    </Link>
  </div>
)

export default Header
