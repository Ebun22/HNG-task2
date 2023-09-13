import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react'

//Lol this is just stage 2 and I want to pass out. 
//what is wrong with this API. this is not how stage 2 should be o
//arghhh fuck. why aren't these endpoints straight forward. this can't be  real life case, I'd legit throw hands with the backend dev

const ChangeContext = createContext(null)

//To prevent error if any context value is still null
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
    const [movieDetails, setMovieDetails] = useState([])
    const [params, setParams] = useState('')
    const [bannerURL, setBannerURL] = useState('https://api.themoviedb.org/3/movie/upcoming?api_key=676abacf856fab82a2a03223135d9541')
    const [URL, setURL] = useState('https://api.themoviedb.org/3//movie/top_rated?api_key=676abacf856fab82a2a03223135d9541')
    const baseURL = "https://www.themoviedb.org/t/p/w220_and_h330_face/"

    const route = useRouter()

    //Fetch all the movies on home page
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
            } else {
                console.log("opps! there has been an error")
            }

        } catch (error) {
            throw new Error("Poor network connection. Please try again")
        }
    }

    //set all languages to pass into the genres URL
    useEffect(() => {
        allData.forEach((item) => {
            setLanguage(prev => [...prev, item.original_language])
        });
    }, [allData]);

    //Get all genres
    const getAllGenres = async () => {
        try {
            const apiCall = language?.map(async lang => {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${lang}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                    },
                });

                if (response.status === 200) {
                    const data = await response.json()
                    // Append genres to previous data
                    setGenreData((prevGenreData) => [...prevGenreData, ...data.genres]);
                    return data
                } else {
                    throw new Error('API call failed');
                }
            })
            const result = await Promise.all(apiCall)
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while fetching data');
        }
    };
    //Get all genres anytime language changes
    useEffect(() => {
        getAllGenres();
    }, [language])

    //get each genre name
    const getGenrefromID = (id) => {
        return id.map((genreId) => {
            const genre = genreData.find((g) => g.id === genreId);
            console.log(genre)
            return genre ? genre.name : '';
        });
    }

    //Get movies for the banner carousel
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
            } else {
                console.log("opps! there has been an error")
            }

        } catch (error) {
            throw new Error("Poor network connection. Please try again")
        }
    }

    //call these at initial render
    useEffect(() => {
        getAllMovies();
        getBannerMovies();
    }, [])

    const getMovieDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${params}?api_key=676abacf856fab82a2a03223135d9541`, {
                method: 'GET',
                Header: new Headers({
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            });
            if (response.status === 200) {
                const result = await response.json()
                setMovieDetails(result)
                console.log(movieDetails)
            }
        } catch (error) {
            throw new Error("Poor network connection. Please try again")
        }
    }

    //Get movie details when params changes
    useEffect(() => {
        getMovieDetails();
    }, [params])
    const getMovieCredit = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params}/credits?language=en-US`, {
            method: 'GET',
            header: new Headers({
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
            })
        })
    }
    const value = {
        allData,
        bannerData,
        baseURL,
        genreData,
        getGenrefromID,
        setLanguage,
        language,
        params,
        setParams,
        getMovieDetails,
        movieDetails,
        setMovieDetails,
    }

    return <ChangeContext.Provider value={value}>
        {children}
    </ChangeContext.Provider>
}

export default StateContext;