import React, { useState, useEffect } from 'react'
import VerticalLayout from 'layouts/VerticalLayout'
import FullLayout from 'layouts/FullpageLayout'
import themeConfig from 'configs/themeConfig'
const layouts = {
  vertical: VerticalLayout,
  full: FullLayout
}
const ContextLayout = React.createContext()
const Layout = (props) => {
  const [activeLayout, setactiveLayout] = useState(themeConfig.layout)
  const [width, setwidth] = useState(window.innerWith)
  const [direction, setdirection] = useState(themeConfig.direction)
  const updateWidth = () => setwidth(window.innerWidth)
  const handleWindowResize = () => {
    updateWidth()
  }
  useEffect(() => {
    if (window !== 'undefined') {
      window.addEventListener('resize', handleWindowResize)
    }
    handleDirUpdate()
    setactiveLayout('vertical')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDirUpdate = () => {
    const dir = direction
    if (dir === 'rtl')
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl')
    else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr')
  }

  const { children } = props
  return (
    <ContextLayout.Provider
      value={{
        state: { activeLayout, width, direction },
        fullLayout: layouts['full'],
        VerticalLayout: layouts['vertical'],
        switchLayout: (layout) => {
          setactiveLayout(layout)
        },
        switchDir: (dir) => {
          setdirection(dir)
        }
      }}
    >
      {children}
    </ContextLayout.Provider>
  )
}

export { Layout, ContextLayout }
