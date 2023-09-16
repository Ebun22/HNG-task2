import React, { createContext, useContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeContext = createContext(null)

//To prevent error if any context value is still null
export const useStateContext = () => {
    const store = useContext(ChangeContext);
    if (store === null) {
        throw new Error("NO Movies can be found")
    }
    return store;
}

//context hook
const StateContext = ({ children }) => {
    const [allData, setAllData] = useState([])
    const [bannerData, setBannerData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [language, setLanguage] = useState([])
    const [genreData, setGenreData] = useState([])
    const [movieDetails, setMovieDetails] = useState([])
    const [movieCredits, setMovieCredits] = useState([])
    const [movieCountry, setMovieCountry] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [search, setSearch] = useState(false);
    const [favourite, setFavourite] = useState(Array(allData.length).fill(false));
    const [carouselItem, setCarouselItem] = useState('')
    const [date, setDate] = useState('')
    const [searchParam, setSearchParam] = useState('')
    const [params, setParams] = useState('')
    const [newBanner, setNewBanner] = useState([])
    const [detailCountry, setDetailCountry] = useState('')
    const [bannerURL, setBannerURL] = useState('https://api.themoviedb.org/3/movie/upcoming?api_key=676abacf856fab82a2a03223135d9541')
    const [URL, setURL] = useState('https://api.themoviedb.org/3//movie/top_rated?api_key=676abacf856fab82a2a03223135d9541')
    const baseURL = "https://www.themoviedb.org/t/p/original/"

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

            const data = await response.json()
            if (data.results) {
                setAllData(data.results)
            } else {
                console.log("opps! there has been an error")
                toast.error("data server seems to be having an issue")
            }
        } catch (error) {
            toast.error("Poor network connection. Please try again")
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

                const data = await response.json()
                if (data) {
                     // Append genres to previous data
                     setGenreData((prevGenreData) => [...prevGenreData, ...data.genres]);
                     return data
                } else {
                    toast.error("data server seems to be having an issue")
                    throw new Error('API call failed');
                }
            })
            const result = await Promise.all(apiCall)
        } catch (error) {
            console.error(error);
            toast.error("Poor network connection. Please try again")
            throw new Error('An error occurred while fetching data');
        }
    };

    //get each genre name
    const getGenrefromID = (id) => {
        return id.map((genreId) => {
            const genre = genreData.find((g) => g.id === genreId);
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

            const data = await response.json()
            if (data.results) {
                setBannerData(data.results)
            } else {
                toast.error("data server seems to be having an issue")
            }

        } catch (error) {
            toast.error("Poor network connection. Please try again")
            throw new Error("Poor network connection. Please try again")
        }
    }

    //fetch deatils of each movie
    const getMovieDetails = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${params}?api_key=676abacf856fab82a2a03223135d9541`, {
                method: 'GET',
                Header: new Headers({
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            });

            const result = await response.json()
            if (result) {
                setMovieDetails(result)
            } else {
                toast.error("data server seems to be having an issue")
            }
        } catch (error) {
            toast.error("Poor network connection. Please try again")
            throw new Error("Poor network connection. Please try again")
        }
    }

    //fetch all countries
    const getCountries = async (param) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${param}?api_key=676abacf856fab82a2a03223135d9541`, {
                method: 'GET',
                Header: new Headers({
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            });

            const result = await response.json()
            if (result) {
                setMovieCountry(result)
            } else {
                toast.error("data server seems to be having an issue")
            }
        } catch (error) {
            toast.error("Poor network connection. Please try again")
            throw new Error("Poor network connection. Please try again")
        }
    }

    //get the credits of each movie
    const getMovieCredit = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${params}/credits?api_key=676abacf856fab82a2a03223135d9541`, {
                method: 'GET',
                Header: new Headers({
                    accept: 'application/json',

                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            });

            const result = await response.json();
            if (result) {
                setMovieCredits(result)
            } else {
                toast.error("data server seems to be having an issue")
            }
        } catch (error) {
            toast.error("Poor network connection. Please try again")
            throw new Error("poor nextwork connection")
        }
    }

    //updates search state
    const handleSearchInput = async (event) => {
        setSearchParam(event.target.value)
    }

    const handleSearch = async () => {
        setSearch(true)
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchParam}&include_adult=false&language=en-US&page=1&api_key=676abacf856fab82a2a03223135d9541`, {
                method: 'GET',
                Header: new Headers({
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZhYmFjZjg1NmZhYjgyYTJhMDMyMjMxMzVkOTU0MSIsInN1YiI6IjY0ZmU1MGY1ZGI0ZWQ2MTAzODU0ZTVkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NIqNLJXoV7VEg-dInb4lqDa5-vEdbVNf4NShDgP-L8c'
                })
            });

            const result = await response.json();
            if (result.results) {
                setSearchData(result.results)
                console.log(searchParam)
            } else {
                toast.error("data server seems to be having an issue")
            }
        } catch (error) {
            toast.error("poor nextwork connections")
            throw new Error("poor nextwork connection")
        }
    }

    //route back to home page form search
    const handleBackToHome = () => {
        setSearch(false)
    }

    //goto function for the carousel
    const goTo = (index) => {
        setCurrentIndex(index - 1)
    }
    //go to previous slide
    const prevSlide = () => {
        setCurrentIndex(currentIndex <= 0 ? newBanner.length - 1 : currentIndex - 1);
    }
    //go to next slide
    const nextSlide = () => {
        setCurrentIndex(currentIndex === 4 ? 0 : currentIndex + 1)
    }

    //call these at initial render
    useEffect(() => {
        getAllMovies();
        getBannerMovies();
        getCountries()
    }, [])

    //Get movie details and credits when params changes
    useEffect(() => {
        getMovieDetails();
        getMovieCredit();
    }, [params])

    //Get all genres anytime language changes
    useEffect(() => {
        getAllGenres();
    }, [language])

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
        movieCredits,
        newBanner,
        setNewBanner,
        movieCountry,
        setMovieCountry,
        currentIndex,
        setCurrentIndex,
        nextSlide,
        prevSlide,
        detailCountry,
        carouselItem,
        setCarouselItem,
        getCountries,
        search,
        date, 
        setDate,
        handleSearchInput,
        handleSearch,
        handleBackToHome,
        searchData,
        setSearchData,
        favourite,
        setFavourite,
        searchParam,
        goTo,
    }

    return <ChangeContext.Provider value={value}>
        {children}
    </ChangeContext.Provider>
}

export default StateContext;