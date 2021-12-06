function handleKeyMobileNumber(e) {
  let key = e?.keyCode || e?.which
  key = String.fromCharCode(key)
  const regex = /^[0-9]*$/
  if (!regex.test(key)) {
    e.preventDefault()
    return false
  }
}
export default handleKeyMobileNumber
