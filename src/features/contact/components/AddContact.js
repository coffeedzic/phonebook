import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoadingInProgress, unsetLoadingInProgress } from '../../../redux/reducers/loading-reducer'
import contentHeightHelper from '../../../helpers/content-height-helper'

import PageHeading from '../../page-heading/components/PageHeading'
import Loader from '../../loader/components/Loader'
import PageLoader from '../../loader/components/PageLoader'

import '../styles/Contact.css'
import defaultContactPicture from '../images/default.jpg'
import uploadIcon from '../images/camera.svg'

const AddContact = () => {
  const [contactName, setContactName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [contactPicture, setContactPicture] = useState(null)
  const [contactPictureData, setContactPictureData] = useState(null)  
  const [responseMessage, setResponseMessage] = useState('')
  const [responseError, setResponseError] = useState('')
  const [pageLoaded, setPageLoaded] = useState(false)
  
  const loggedIn = useSelector(state => state.user.loggedIn)
  const userId = useSelector(state => state.user.userId)
  const userAuthToken = useSelector(state => state.user.userAuthToken)
  const loadingInProgress = useSelector(state => state.loading.loadingInProgress)
  
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    contentHeightHelper()
    setTimeout(() => {
      setPageLoaded(true)
    }, 200)
  }, [])

  const handleImageUploadClick = () => {
    document.getElementById('img-upload').click()
  }
  
  const handleImageUpload = event => {
    dispatch(setLoadingInProgress())
    setContactPicture(event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : false)
    
    let reader = new FileReader()
    if(event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0])
    } else {
      dispatch(unsetLoadingInProgress())
    }

    reader.addEventListener('load', () => {
      setContactPictureData(reader.result)
      dispatch(unsetLoadingInProgress())
    })
  }

  const handleInput = event => {
    const {name, value} = event.target
    name === 'contactName' ? setContactName(value) : setContactNumber(value)
  }

  const addContact = async () => {
    axios.post('api/add', {
      add: true,
      token: userAuthToken,
      contactName: contactName,
      contactNumber: contactNumber,
      contactPicture: contactPictureData,
      contactUserId: userId
    })
    .then(response => {
      dispatch(unsetLoadingInProgress())
      setResponseError(response.data.error)
      setResponseMessage(response.data.message)
      if(!response.data.error) {
        setTimeout(() => {
          history.push('/')
        }, 1000)
      }     
    })
  }

  const handleSubmit = () => {
    dispatch(setLoadingInProgress())
    addContact()    
  }

  const renderLoading = () => {
    return(
      loadingInProgress ? <Loader /> : null
    )
  }

  const renderResponseMessage = () => {
    if(responseMessage) {
      return(        
        <div className="message"><span className={responseError ? 'error' : null}>{responseMessage}</span></div>
      )
    }
  }

  const renderPage = () => {
    return(      
      <div className="contact">
        <div className="picture-edit">
          <div className="picture-preview">
            <img 
              src={contactPicture ? contactPicture : defaultContactPicture}
              alt="preview"
              className="image-preview"
            />
            <div className="upload-icon">
              <img
                src={uploadIcon}
                alt="upload"
                onClick={handleImageUploadClick}
              />
            </div>          
          </div>
          <div className="picture-upload">
            <input
              id="img-upload"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="form">
          <div className="input-field">
            <label>Name</label>
            <input 
              type="text"
              name="contactName"
              value={contactName}
              onChange={handleInput}
            />
          </div>
          <div className="input-field">
            <label>Phone number</label>
            <input 
              type="text"
              name="contactNumber"
              value={contactNumber}
              onChange={handleInput}
            />
          </div>
          <button
          onClick={handleSubmit}
          >
            Add contact
          </button>
          {renderLoading()}
          {renderResponseMessage()}
        </div>
      </div>
    )
  }

  const renderIfNotLoggedIn = () => {
    return(
      <div className="no-permission">        
        You don't have permission to view this page. Please log in.
      </div>
    )
  }

  return(
    <main>
      {pageLoaded ? null : <PageLoader />}
      <PageHeading
        name = "Add Contact"
        linkTo = "/"
        linkText = "Back"
        search = {false}
      />
      {loggedIn ? renderPage() : renderIfNotLoggedIn()}
    </main>
    
  )
}

export default AddContact