export const changeLanguage = (mode) => {
  return (dispatch) => dispatch({ type: 'CHANGE_LANGUAGE', mode })
}
export const collapseSidebar = (value) => {
  return (dispatch) => dispatch({ type: 'COLLAPSE_SIDEBAR', value })
}
