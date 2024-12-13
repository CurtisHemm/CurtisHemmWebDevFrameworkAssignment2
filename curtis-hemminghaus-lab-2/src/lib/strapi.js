import axios from 'axios'

const STRAPI_URL = process.env.STRAPI_API_URL
// const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export const fetchGenreList = async () => {
    try {
        // const response = await axios.get(STRAPI_URL + "genres?populate=genreImage")
        const response = await axios.get("http://localhost:3000/api/genre")
        console.log("---------Axios Response List---------")
        console.log(response.data)
        return response.data
    }  catch (error) {
        console.error("Error in fetching genreList: " + error)
    }
}

export const fetchGameList = async () => {
    try {
        // const response = await axios.get(STRAPI_URL + "games?populate=gameImage")
        const response = await axios.get("http://localhost:3000/api/game")
        console.log("---------Axios Response List---------")
        console.log(response.data)
        return response.data
    }  catch (error) {
        console.error("Error in fetching gameList: " + error)
    }
}
