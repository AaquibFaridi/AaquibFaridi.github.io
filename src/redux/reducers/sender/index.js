const initialState = {
  getmesssages: [],
  routeParam: null
}

const sender = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MSG':
      return {
        ...state,
        getmesssages: action.getmesssages,
        routeParam: action.routeParams
      }
    case 'LOAD_MSG':
      return {
        ...state,
        loadingmsg: true
      }
    case 'ERR_MSG':
      return {
        ...state,
        loadingmsg: false
      }
    case 'GET_MSG':
      return { ...state, getmesssages: action.getmesssages, loadingmsg: false }
    default:
      return state
  }
}

export default sender
