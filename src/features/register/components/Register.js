import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveModal } from '../../../redux/reducers/modal-reducer'
import { setLoadingInProgress, unsetLoadingInProgress } from '../../../redux/reducers/loading-reducer'

import Loader from '../../loader/components/Loader'

import '../styles/Register.css'

const Register = () => {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userRepeatedPassword, setUserRepeatedPassword] = useState('')
  const [responseError, setResponseError] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)

  const loadingInProgress = useSelector(state => state.loading.loadingInProgress)
  const dispatch = useDispatch()

  const register = async () => {
    
    axios.post('api/register', {
      register: true,
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
      userRepeatedPassword: userRepeatedPassword
    })
    .then(response => {
      dispatch(unsetLoadingInProgress())    
      setResponseError(response.data.error)
      setResponseMessage(response.data.message)
      if(!response.data.error) {
        setTimeout(() => {
          dispatch(setActiveModal('login'))
        }, 1000)
      }
      dispatch(unsetLoadingInProgress())
    })    
  }

  const handleRegister = () => {
    dispatch(setLoadingInProgress())
    register()      
  }

  const handleEnterKey = event => {
    if(event.charCode === 13) {
      handleRegister()
    }
  }

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown)
  }

  const handleInput = event => {
    const {name, value} = event.target

    if(name === 'userName') {
      setUserName(value)
    } else if(name === 'userEmail') {
      setUserEmail(value)
    } else if(name === 'userPassword') {
      setUserPassword(value)
    } else if(name === 'userRepeatedPassword') {
      setUserRepeatedPassword(value)
    }
  }

  const renderLoadingInProgress = () => {
    if(loadingInProgress) {
      return(
        <Loader />
      )
    }
  }

  const renderResponseMessage = () => {
    if(responseMessage) {
      return(        
        <div className="message"><span className={responseError ? 'error' : null}>{responseMessage}</span></div>
      )
    }
  }

  return(
    <div className="register">
      <span className="slogan">Register & start investigating</span>
      <div className="form">
        <div className="input-field">
          <label>Name</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleInput}
            onKeyPress={handleEnterKey}
          />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input
            type="text"
            name="userEmail"
            value={userEmail}
            onChange={handleInput}
            onKeyPress={handleEnterKey}
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            name="userPassword"
            value={userPassword}
            onChange={handleInput}
            onKeyPress={handleEnterKey}
          />
        </div>
        <div className="input-field">
          <label>Repat your password</label>
          <input
            type={passwordShown ? 'text' : 'password'}
            name="userRepeatedPassword"
            value={userRepeatedPassword}
            onChange={handleInput}
            onKeyPress={handleEnterKey}
          />
        </div>
        <div className="show-password">
          <input 
            type="checkbox"
            id="show-password"
            value={passwordShown}
            onChange={handleShowPassword}
          />
          <label htmlFor="show-password">Show password?</label>
        </div>
        <button
          onClick={handleRegister}
        >
          Register
          </button>
        {renderLoadingInProgress()}
        {renderResponseMessage()}
      </div>      
    </div>
  )
}

export default Register