import React, { createContext, useContext, useState, useEffect } from 'react'

const ChangeContext = createContext(null)

export const useStateContext = () => useContext(ChangeContext);

const StateContext = ({ children }) => {
    const [allData, setAllData] = useState(null)
    
        const AllMovies = () => {

        }


    const value = {

    }

    return <ChangeContext.Provider value = {value}>
        {children}
    </ChangeContext.Provider>
}

export default StateContext;