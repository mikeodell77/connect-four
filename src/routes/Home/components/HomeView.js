import React from 'react'
import ConnectFourImage from '../assets/connect4.jpg'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <img
      alt='Four in a row!'
      className='connect-four'
      src={ConnectFourImage} />
  </div>
)

export default HomeView
