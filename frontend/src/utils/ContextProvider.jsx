import { createContext, useContext, useState } from "react"

const authContext = createContext()

export const ContextProvider = ({children}) => {
  return (
    <div>
      
      <authContext.Provider value={{}} >
        {children}
      </authContext.Provider>
    </div>
  )
}

export const useAuthContext = () => {
    return useContext(authContext)
}

