export const setLoadingInProgress = () => ({
  type: 'LOADING.SET_LOADING_IN_PROGRESS' 
})

export const unsetLoadingInProgress = () => ({
  type: 'LOADING.UNSET_LOADING_IN_PROGRESS' 
})

const initialState = {
  loadingInProgress: false,
}

const loadingReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOADING.SET_LOADING_IN_PROGRESS':
      return {
        loadingInProgress: true
      }
    case 'LOADING.UNSET_LOADING_IN_PROGRESS':
      return {
        loadingInProgress: false
      }
    default:
      return state
  }
}

export default loadingReducer