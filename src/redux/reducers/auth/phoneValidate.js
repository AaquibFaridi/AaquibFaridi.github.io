const initialState = {
  data: []
}
export const phoneotp = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_RECOVERY_ID':
      return {
        ...state,
        recoveringId: true
      }
    case 'RECEIVE_RECOVERY_ID':
      return {
        ...state,
        recoveringId: false,
        recoveryData: action.data
      }
    case 'FAILURE_RECOVERY_ID':
      return {
        ...state,
        recoveringId: false,
        recoveryData: null
      }
    case 'RESET_RECOVERY_ID':
      return {
        ...state,
        recoveringId: false,
        recoveryData: null
      }
    case 'REQUEST_CHANGE_PASSWORD':
      return {
        ...state,
        changingpwd: true
      }
    case 'RECEIVE_CHANGE_PASSWORD':
      return {
        ...state,
        changingpwd: false,
        pwdChanged: 'success'
      }
    case 'FAILURE_CHANGE_PASSWORD':
      return {
        ...state,
        changingpwd: false,
        pwdChanged: 'failure'
      }
    case 'RESET_OTP':
      return {
        ...state,
        validatingmobile: false,
        invalidmobile: false,
        validatedmobile: null,
        validatingotp: false,
        invalidotp: false,
        validatedotp: null
      }
    case 'VALIDATING_MOBILE_NUMBER':
      return {
        ...state,
        validatingmobile: true
      }
    case 'VALIDATED_MOBILE_NUMBER':
      return {
        ...state,
        validatingmobile: false,
        invalidmobile: false,
        validatedmobile: action.data
      }
    case 'INVALID_MOBILE_NUMBER':
      return {
        ...state,
        validatingmobile: false,
        validatedmobile: null,
        invalidmobile: true
      }
    case 'VALIDATING_OTP':
      return {
        ...state,
        validatingotp: true
      }
    case 'VALIDATED_OTP':
      return {
        ...state,
        validatingotp: false,
        invalidotp: false,
        validatedotp: action.data
      }
    case 'INVALID_OTP':
      return {
        ...state,
        validatingotp: false,
        invalidotp: true,
        validatedotp: null
      }
    default:
      return state
  }
}
