'use client'
import { useState } from "react"


  // Client-side-only code
const useLocalStorage = (key, initialValue) => {
  
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    }
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = value => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      if (typeof window !== "undefined") {
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}

export default useLocalStorage

// this code has been copied from https://dev.to/collegewap/how-to-use-local-storage-in-nextjs-2l2j