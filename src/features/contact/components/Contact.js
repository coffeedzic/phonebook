import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoadingInProgress, unsetLoadingInProgress } from '../../../redux/reducers/loading-reducer'
import contentHeightHelper from '../../../helpers/content-height-helper'

import PageHeading from '../../page-heading/components/PageHeading'
import Loader from '../../loader/components/Loader'
import PageLoader from '../../loader/components/PageLoader'

import '../styles/Contact.css'
import defaultContactPicture from '../images/default.jpg'
import uploadIcon from '../images/camera.svg'
import callIcon from '../images/call.svg'
import messageIcon from '../images/message.svg'
import editIcon from '../images/edit.svg'
import deleteIcon from '../images/delete.svg'

const Contact = () => {
  const { id } = useParams()
  const [contactName, setContactName] = useState('')
  const [contactNumber, setContactNumber] = useState('')  
  const [contactPicture, setContactPicture] = useState(false)
  const [contactPictureData, setContactPictureData] = useState(false)  
  const [responseMessage, setResponseMessage] = useState('')  
  const [responseError, setResponseError] = useState('')
  const [pageLoaded, setPageLoaded] = useState(false)
  const [isEditEnabled, setIsEditEnabled] = useState(false)
  const [isUserLoaded, setIsUserLoaded] = useState(false)
  const [doesUserHaveImage, setDoesUserHaveImage] = useState(false)

  const userId = useSelector(state => state.user.userId)
  const userAuthToken = useSelector(state => state.user.userAuthToken)
  const loadingInProgress = useSelector(state => state.loading.loadingInProgress)

  const dispatch = useDispatch()
  const history = useHistory()

  const getContact = async () => {
    axios.post('api/getcontact', {
      getcontact: true,
      token: userAuthToken,
      id: id,
      contactUserId: userId
    })
    .then(response => {
      if(!response.data.error) {
        setResponseError(response.data.error)
        setResponseMessage(response.data.message)
        setContactName(response.data.contact.contactName)
        setContactNumber(response.data.contact.contactNumber)
        setContactPicture(response.data.contact.contactPicture)

        if(response.data.contact.contactPicture.length > 0) {
          setDoesUserHaveImage(true)
        }
        setIsUserLoaded(true)        
      } else {
        setResponseError(response.data.error)
        setResponseMessage(response.data.message)
      }
    })
  }

  const changePhoto = async (pictureData) => {
    axios.post('api/changephoto', {
      changephoto: true,
      token: userAuthToken,
      id: id,
      contactUserId: userId,
      contactPicture: pictureData
    })
    .then(response => {
      console.log(response)
      setResponseError(response.data.error)
      setResponseMessage(response.data.message)
    })
  }

  useEffect(() => {
    contentHeightHelper()
    getContact()
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
      changePhoto(reader.result)
      setDoesUserHaveImage(false)
      dispatch(unsetLoadingInProgress())
    })
  }

  const handleInput = event => {
    const {name, value} = event.target
    name === 'contactName' ? setContactName(value) : setContactNumber(value)
  }

  const editContact = async () => {
    axios.post('api/edit', {
      edit: true,
      token: userAuthToken,
      id: id,
      contactName: contactName,
      contactNumber: contactNumber,
      contactUserId: userId
    })
    .then(response => {
      dispatch(unsetLoadingInProgress())
      setResponseError(response.data.error)
      setResponseMessage(response.data.message)
      if(!response.data.error) {
        setTimeout(() => {
          setIsEditEnabled(false)
        }, 500)
      }
    })
  }

  const handleSaveContact = () => {
    dispatch(setLoadingInProgress())
    editContact() 
  }

  const deleteContact = async () => {
    dispatch(setLoadingInProgress())
    axios.post('api/delete', {
      delete: true,
      token: userAuthToken,
      id: id,
      contactUserId: userId
    })
    .then(response => {
      console.log(response)
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

  const renderContactPicture = () => {
    if(isUserLoaded) {
      if(doesUserHaveImage) {
        let image = 'api/images/' + contactPicture
        return image
      } else {
        return contactPicture ? contactPicture : defaultContactPicture
      }
    }
  }

  const renderButtons = () => {
    if(isEditEnabled) {
      return(
        <div className="buttons">
          <button onClick={handleSaveContact}>
            Save contact
          </button>
          <button onClick={() => {setIsEditEnabled(false)}}>
            Close
          </button>
        </div>
      )
    } else {
      return(
        <div className="icons">
          <a href={'tel:' + contactNumber}>
            <div className="icon call-icon">
              <img src={callIcon} alt="call-icon" />
            </div>
          </a>
          <a href={'sms:' + contactNumber}>
            <div className="icon message-icon">
              <img src={messageIcon} alt="call-icon" />
            </div>
          </a>
          <div className="icon edit-icon" onClick={() => {setIsEditEnabled(true)}}>
            <img src={editIcon} alt="call-icon" />
          </div>
          <div className="icon delete-icon" onClick={deleteContact}>
            <img src={deleteIcon} alt="call-icon" />
          </div>
        </div>
      )
    }    
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
              src={renderContactPicture()}
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
              disabled = {!isEditEnabled}
            />
          </div>
          <div className="input-field">
            <label>Phone number</label>
            <input 
              type="text"
              name="contactNumber"
              value={contactNumber}
              onChange={handleInput}
              disabled = {!isEditEnabled}
            />
          </div>
          {renderButtons()}
          {renderLoading()}
          {renderResponseMessage()}
        </div>
      </div>
    )
  }

  const renderFetchError = () => {
    return(
      <div className="no-permission">        
        {responseMessage}
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
      {isUserLoaded ? renderPage() : renderFetchError()}
    </main>
  )
}

export default Contact