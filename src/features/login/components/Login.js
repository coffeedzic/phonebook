import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../../redux/reducers/modal-reducer'
import { setLoadingInProgress, unsetLoadingInProgress} from '../../../redux/reducers/loading-reducer'
import { setLoggedIn, setUserAuthToken } from '../../../redux/reducers/user-reducer'
import token from '../../../helpers/tokenhelper'

import Loader from '../../loader/components/Loader'

import '../styles/Login.css'



const Login = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [responseError, setResponseError] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)

  const loadingInProgress = useSelector(state => state.loading.loadingInProgress)
  const dispatch = useDispatch()

  const login = async () => {
    axios.post('api/login', {
      login: true,
      userEmail: userEmail,
      userPassword: userPassword
    })
    .then(response => {
      dispatch(unsetLoadingInProgress())
      setResponseError(response.data.error)
      setResponseMessage(response.data.message)
      if(!response.data.error) {
        token.set('userAuthToken', response.data.jwt)        
        setTimeout(() => {
          dispatch(setUserAuthToken(response.data.jwt))
          dispatch(setLoggedIn())          
          dispatch(closeModal())
        }, 1000)
      }
    })
  }

  const handleLogin = () => {
    dispatch(setLoadingInProgress())
    login()
  }

  const handleEnterKey = event => {
    if(event.charCode === 13) {
      handleLogin()
    }
  }

  const handleShowPassword = () => {
    setPasswordShown(!passwordShown)
  }

  const handleInput = event => {
    const {name, value} = event.target
    name === 'userEmail' ? setUserEmail(value) : setUserPassword(value)
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
    <div className="login">
      <span className="slogan">Login & start your journey</span>
      <div className="form">
        <div className="input-field">
          <label>Email</label>
          <input 
            type="text"
            name="userEmail"
            value={userEmail}
            onChange={handleInput}
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
        <div className="show-password">
          <input 
            type="checkbox"
            id="show-password"
            value={passwordShown}
            onChange={handleShowPassword}
          />
          <label htmlFor="show-password">Show password</label>
        </div>
        <button
          onClick={handleLogin}
        >
          Login
        </button>
        {renderLoadingInProgress()}
        {renderResponseMessage()}
      </div>      
    </div>
  )
}

export default Login