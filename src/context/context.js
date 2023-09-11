import React, { createContext, useContext, useState, useEffect } from 'react'

const ChangeContext = createContext(null)

export const useStateContext = () => {
    const store = useContext(ChangeContext);
    if (store === null) {
        throw new Error("NO Movies can be found")
    }
    return store;
}

const StateContext = ({ children }) => {
    const [allData, setAllData] = useState([])
    const [bannerData, setBannerData] = useState([])
    const [language, setLanguage] = useState([])
    const [genreData, setGenreData] = useState([])
    // const [genreURL, setGenreURL] = useState('https://api.themoviedb.org/3/genre/movie/list?language=en')
    const [bannerURL, setBannerURL] = useState('https://api.themoviedb.org/3/movie/upcoming?api_key=676abacf856fab82a2a03223135d9541')
    const [URL, setURL] = useState('https://api.themoviedb.org/3//movie/top_rated?api_key=676abacf856fab82a2a03223135d9541')
    const baseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

    const getAllMovies = async () => {
        try {
            const response = await fetch(URL, {
                method: 'GET',
                header: new Headers({
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            })

            if (response.status === 200) {
                const data = await response.json()
                setAllData(data.results)
                console.log(allData)
                const languages = allData.map((item) => {
                    return console.log(item.original_language)
                })
                console.log(languages)
            } else {
                console.log("opps! there has been an error")
            }

        } catch (error) {
            throw new Error("Poor network connection. Please try again")
        }
    }

    const getAllGenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${language}`, {
                method: 'GET',
                header: new Headers({
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            })
            console.log("....language..." + language)
            if (response.status === 200) {
                const data = await response.json()
                setGenreData(data.results)
                console.log(genreData)
            } else {
                console.log("opps! there has been an error")
            }

        } catch (error) {
            throw new Error("Poor network connection. Please try again")
        }
    }

    const getGenrefromID = (id) => {
        const filteredData = genreData.filter((item) => id.includes(item.id))
        const genreNames = filteredData.map((item) => item.name)
        //    return genreNames
        console.log(genreNames)
    }

    const getBannerMovies = async () => {
        try {
            const response = await fetch(bannerURL, {
                method: 'GET',
                header: new Headers({
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            })

            if (response.status === 200) {
                const data = await response.json()
                setBannerData(data.results)
                console.log(data.results)
            } else {
                console.log("opps! there has been an error")
            }

        } catch (error) {
            throw new Error("Poor network connection. Please try again")
        }
    }

    useEffect(() => {
        getAllMovies();
        getBannerMovies();
    }, [])
    useEffect(() => {
        getAllGenres();
    }, [language])
    // getAllGenres();
    const value = {
        allData,
        bannerData,
        baseURL,
        getGenrefromID,
        setLanguage,
    }

    return <ChangeContext.Provider value={value}>
        {children}
    </ChangeContext.Provider>
}

export default StateContext;