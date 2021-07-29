export const setIsImageUploading = () => ({
  type: 'CONTACT.SET_IS_IMAGE_UPLOADING'
})

export const unsetIsImageUploading = () => ({
  type: 'CONTACT.UNSET_IS_IMAGE_UPLOADING'
})

export const setIsContactInProgress = () => ({
  type: 'CONTACT.SET_IS_CONTACT_IN_PROGRESS'
})

export const unsetIsContactInProgress = () => ({
  type: 'CONTACT.UNSET_IS_CONTACT_IN_PROGRESS'
})

const initialState = {
  isImageUploading: false,
  isContactInProgress: false,
}

const contactReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CONTACT.SET_IS_IMAGE_UPLOADING':
      return {
        ...state,
        isImageUploading: true
      }
    case 'CONTACT.UNSET_IS_IMAGE_UPLOADING':
      return {
        ...state,
        isImageUploading: false
      }
    case 'CONTACT.SET_IS_CONTACT_IN_PROGRESS':
      return {
        ...state,
        isContactInProgress: true
      }
    case 'CONTACT.UNSET_IS_CONTACT_IN_PROGRESS':
      return {
        ...state,
        isContactInProgress: false
      }
    default:
      return state
  }
}

export default contactReducer