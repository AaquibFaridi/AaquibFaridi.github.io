import themeConfig from 'configs/themeConfig'
import en from 'assets/data/en.json'
import fr from 'assets/data/frn.json'
import gr from 'assets/data/grm.json'
import hi from 'assets/data/hin.json'
import ch from 'assets/data/chn.json'
import ar from 'assets/data/grm.json'
import sp from 'assets/data/spn.json'
import rs from 'assets/data/rus.json'
import ur from 'assets/data/urd.json'

const setMessage = (params) => {
  switch (params) {
    case 'Arabi':
      return ar
    case 'Chinese':
      return ch
    case 'English':
      return en
    case 'German':
      return gr
    case 'French':
      return fr
    case 'Hindi':
      return hi
    case 'Russian':
      return rs
    case 'Spanish':
      return sp
    case 'Urdu':
      return ur
    default:
      return en
  }
}
const customizerReducer = (state = themeConfig, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: setMessage(action.mode) ? setMessage(action.mode) : en
      }
    case 'COLLAPSE_SIDEBAR':
      return { ...state, sidebarCollapsed: action.value }
    default:
      return state
  }
}

export default customizerReducer
