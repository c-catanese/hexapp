"use client";

import React from 'react';
import styles from './Header.module.scss'
import DefaultButton from '../Buttons/DefaultButton/DefaultButton';

const Header = () => {
 
  return(
    <header className={styles.headerContainer}>
      <div className={styles.leftNav}>

      </div>
      <h1 className={styles.title}>H E X</h1>
      <div className={styles.rightNav}>
        <DefaultButton text={'Login'} func={() => {console.log('logging in clicked')}}/>
        <DefaultButton text={'Sign Up'} func={() => {console.log('sign up clicked')}}/>
      </div>
    </header>
  )
}

export default Header