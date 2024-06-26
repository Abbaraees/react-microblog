import { useContext, createContext, useState } from "react";

export const FlashContext = createContext()
let flashTimer;

import React from 'react'

function FlashProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState({})
  const [visible, setVisible] = useState(false)

  const flash = (message, type, duration) => {
    if (flashTimer) {
      clearTimeout(flashTimer)
      flashTimer = undefined
    }

    setFlashMessage({message, type})
    setVisible(true)

    if (duration) {
      flashTimer = setTimeout(hideFlash, duration * 1000)
    }
  }

  const hideFlash = () => {
    setVisible(false)
  }
  return (
    <FlashContext.Provider value={{flash, hideFlash, flashMessage, visible}}>
      { children }
    </FlashContext.Provider>
  )
}

export const useFlash = () => {
  return useContext(FlashContext).flash
}

export default FlashProvider