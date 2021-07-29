import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { closeModal, setActiveModal } from '../../../redux/reducers/modal-reducer'

import Register from '../../register/components/Register'
import Login from '../../login/components/Login'

import '../styles/Modal.css'
import closeIcon from '../images/close.svg'
import dot from '../images/dot.svg'

const Modal = () => {
  const activeModal = useSelector(state => state.modal.activeModal)
  const dispatch = useDispatch()

  const renderModalMenu = () => (
    <div className="modal-menu">
      <div className="switch">
        <span
          onClick={() => dispatch(setActiveModal('login'))}
        >
          Login
        </span>
        {activeModal === 'login' ? <img src={dot} alt="dot" className="dot" /> : null}
      </div>
      <div className="switch">
        <span
          onClick={() => dispatch(setActiveModal('register'))}
        >
          Register
        </span>
        {activeModal === 'register' ? <img src={dot} alt="dot" className="dot" /> : null}
      </div>
    </div>      
  )

  const renderComponent = () => (
    activeModal === 'register' ? <Register /> : <Login />
  )

  return(
    <div className="modal">
      <div className="modal-box">
        <button
         className="close-button"
         onClick={() => dispatch(closeModal())}
        >
          <img src={closeIcon} alt="close" />
        </button>
        {renderModalMenu()}
        {renderComponent()} 
      </div>
    </div>
  )
}

export default Modal