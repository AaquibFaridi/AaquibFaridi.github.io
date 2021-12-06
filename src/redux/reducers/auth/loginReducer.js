export const login = (
  state = { userRole: 'admin', plan: false, why: false, feature: false },
  action
) => {
  switch (action.type) {
    case 'OPEN_DOWNLOAD': {
      return {
        ...state,
        download: action.payload
      }
    }
    case 'LOGIN_WITH_PLAN': {
      return {
        ...state,
        plan: action.payload,
        feature: !action.payload,
        why: !action.payload
      }
    }
    case 'LOGIN_WITH_FEATURE': {
      return {
        ...state,
        plan: !action.payload,
        feature: action.payload,
        why: !action.payload
      }
    }
    case 'LOGIN_WITH_WHY': {
      return {
        ...state,
        plan: !action.payload,
        feature: !action.payload,
        why: action.payload
      }
    }

    // case 'LOGIN_WITH_PLAN': {
    //   return { ...state, plan: action.payload }
    // }
    // case 'LOGIN_WITH_FEATURE': {
    //   return { ...state, feature: action.payload }
    // }
    // case 'LOGIN_WITH_WHY': {
    //   return { ...state, why: action.payload }
    // }
    case 'LOGIN_WITH_EMAIL': {
      return { ...state, values: action.payload }
    }
    case 'LOGIN_WITH_FB': {
      return { ...state, values: action.payload }
    }
    case 'LOGIN_WITH_TWITTER': {
      return { ...state, values: action.payload }
    }
    case 'LOGIN_WITH_GOOGLE': {
      return { ...state, values: action.payload }
    }
    case 'LOGIN_WITH_GITHUB': {
      return { ...state, values: action.payload }
    }
    case 'LOGIN_WITH_JWT': {
      return { ...state, values: action.payload }
    }
    case 'LOGOUT_WITH_JWT': {
      return { ...state, values: action.payload }
    }
    case 'LOGOUT_WITH_FIREBASE': {
      return { ...state, values: action.payload }
    }
    case 'CHANGE_ROLE': {
      return { ...state, userRole: action.userRole }
    }
    default: {
      return state
    }
  }
}
