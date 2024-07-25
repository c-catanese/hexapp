import React from 'react';
import styles from './Homepage.module.scss'
import Game from '../../../Components/Game/Game';
const Homepage = () => {
 
  return(
    <div className={styles.homepageContainer}>
      <Game/>
    </div>
  )
}

export default Homepage