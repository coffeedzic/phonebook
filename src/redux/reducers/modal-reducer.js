export const openModal = () => ({
  type: 'MODAL.OPEN_MODAL'  
})

export const closeModal = () => ({
  type: 'MODAL.CLOSE_MODAL' 
})

export const setActiveModal = modal => ({
  type: 'MODAL.SET_ACTIVE_MODAL',
  payload: modal
})

const initialState = {
  modalOpened: false,
  activeModal: '' 
}

function modalReducer(state = initialState, action) {
  switch(action.type) {
    case 'MODAL.OPEN_MODAL':
      return {
        ...state,
        modalOpened: true
      }
    case 'MODAL.CLOSE_MODAL':
      return {
        ...state,
        modalOpened: false
      }
    case 'MODAL.SET_ACTIVE_MODAL':
      return {
        ...state,
        activeModal: action.payload
      }
    default:
      return state
  }
}

export default modalReducer