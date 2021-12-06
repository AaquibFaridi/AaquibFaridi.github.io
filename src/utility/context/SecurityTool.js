import aes256 from 'aes256'

export const encryptdata = (data, isInternal, key2) => {
  const key = isInternal ? 'l@st@rz!' : localStorage.getItem('secretkey')
  if (data && data.length > 0) return aes256.encrypt(key2 ? key2 : key, data)
  else return data
}

export const decryptdata = (data, isInternal, key2) => {
  const key = isInternal ? 'l@st@rz!' : localStorage.getItem('secretkey')
  if (data && data.length > 0) return aes256.decrypt(key2 ? key2 : key, data)
  else return data
}

export const encryptfile = (data, isInternal, key2) => {
  const key = isInternal ? 'l@st@rz!' : localStorage.getItem('secretkey')

  return aes256.encrypt(key2 ? key2 : key, data)
}
