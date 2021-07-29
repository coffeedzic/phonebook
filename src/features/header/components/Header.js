import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openModal, setActiveModal } from '../../../redux/reducers/modal-reducer'
import { unsetLoggedIn } from '../../../redux/reducers/user-reducer'
import token from '../../../helpers/tokenhelper'

import Modal from '../../modal/components/Modal'

import '../styles/Header.css'
import phone from '../images/phone.svg'

const Header = () => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const modalOpened = useSelector(state => state.modal.modalOpened)
  const dispatch = useDispatch()
  
  const renderNavLinks = () => {
    const navLinks = [
      {
        name: 'login',
        onClick: () => {
          dispatch(setActiveModal('login'))
          dispatch(openModal())
        },
        showIfLoggedIn: false
      },
      {
        name: 'register',
        onClick: () => {
          dispatch(setActiveModal('register'))
          dispatch(openModal())
        },
        showIfLoggedIn: false
      },
      {
        name: 'log out',
        onClick: () => {          
          dispatch(unsetLoggedIn())
          token.remove('userAuthToken')
        },
        showIfLoggedIn: true
      }
    ]
  
    return navLinks.map((item, index) => {
      if(item.showIfLoggedIn === loggedIn) {
        return(
          <div
            key={index}
            className="link"
            onClick={item.onClick}
          >
            {item.name}
          </div>
        )
      } else {
        return null
      }      
    })
  }

  return(
    <header id="header">
      <div className="logo">
        <img 
          src={phone}
          alt="Phone icon"
        />
        <h1>Phonebook</h1>
      </div>
      <div className="menu">
        {renderNavLinks()}
      </div>
      {modalOpened ? <Modal /> : null}
    </header>
  )
}

export default Header