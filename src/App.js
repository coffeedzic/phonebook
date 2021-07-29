import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import {
  setLoggedIn,
  unsetLoggedIn, 
  setUserId,
  setUserName,
  setUserEmail
} from './redux/reducers/user-reducer'

import Header from './features/header/components/Header'
import Footer from './features/footer/components/Footer'
import Landing from './features/landing/components/Landing'
import Contacts from './features/contacts/components/Contacts'
import AddContact from './features/contact/components/AddContact'
import Contact from './features/contact/components/Contact'

import './App.css'

const App = () => {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const userAuthToken = useSelector(state => state.user.userAuthToken)

  const [syncLoginStatus, setSyncLoginStatus] = useState(loggedIn)
  const [preventLoop, setPreventLoop] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setSyncLoginStatus(loggedIn)
  }, [syncLoginStatus])

  if(userAuthToken && !preventLoop) {
    let decodedToken = jwt_decode(userAuthToken)
    let date = new Date()

    if(decodedToken.exp * 1000 > date.getTime()) {
      dispatch(setLoggedIn())
      dispatch(setUserId(decodedToken.data.id))
      dispatch(setUserName(decodedToken.data.name))   
      dispatch(setUserEmail(decodedToken.data.email))
    } else {
      dispatch(unsetLoggedIn())
    }
    setPreventLoop(true)
  }

  return(
    <div className="app">
      <Header />
      <Route path="/" exact>
        {loggedIn ? <Contacts /> : <Landing />}
      </Route>
      <Route path="/add-contact" exact>
        <AddContact />
      </Route>
      <Route path="/contact/:id" exact>
        <Contact />
      </Route>
      <Footer />
    </div>
  )
}

export default App