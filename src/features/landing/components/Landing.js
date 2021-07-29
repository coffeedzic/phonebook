import React, { useState, useEffect } from 'react'
import contentHeightHelper from '../../../helpers/content-height-helper'

import PageLoader from '../../loader/components/PageLoader'

import '../styles/Landing.css'
import qr from '../images/qr.svg'

const Landing = () => {
  const [pageLoaded, setPageLoaded] = useState(false)
  useEffect(() => {
    contentHeightHelper()

    setTimeout(() => {
      setPageLoaded(true)
    }, 200)
  }, [])

  const rednerPageLoader = () => {
    return pageLoaded ? null : <PageLoader />
  }

  return(
    <div className="landing">
      {rednerPageLoader()}
      <div className="landing-image">
        <img 
          src={qr}
          alt="QR Code"
        />
      </div>
      <div className="landing-text">
        <h2>Phonebook application created with ReactJS</h2>
        <p>Register / Login / Add, edit & delete contact / View & search contacts</p>
      </div>      
    </div>
  )
}

export default Landing