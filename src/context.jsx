import React, { useState, useEffect, useContext, useReducer } from 'react'
import reducer from './reducer'
import { fetchProducts } from './services/api'

const AppContext = React.createContext()

const initialState = {
  cart: [],
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [lang, setLangu] = useState(true)
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const changeLanguage = (language) => {
    setLangu(language)
  }

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error('Failed to load products', err))
      .finally(() => setProductsLoading(false))
  }, [])
  const add = (id, num) => {
    dispatch({ type: 'add', payload: { id, num } })
  }
  const increase = (id) => {
    dispatch({ type: 'increase', payload: { id } })
  }
  const decrease = (id) => {
    dispatch({ type: 'decrease', payload: { id } })
  }
  const removeAll = (id) => {
    dispatch({ type: 'removeAll', payload: {} })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        add,
        increase,
        decrease,
        removeAll,
        lang,
        changeLanguage,
        products,
        productsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
