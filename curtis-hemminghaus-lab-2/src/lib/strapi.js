import axios from 'axios'

const STRAPI_URL = process.env.STRAPI_API_URL
// const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export const fetchGenreList = async () => {
    try {
        const response = await axios.get(STRAPI_URL + "genres?populate=genreImage")
        console.log("---------Axios Response List---------")
        console.log(response.data)
        return response.data
    }  catch (error) {
        console.error("Error in fetching experienceList: " + error)
    }
}

export const fetchGameList = async () => {
    try {
        const response = await axios.get(STRAPI_URL + "genres?populate=gameImage")
        console.log("---------Axios Response List---------")
        console.log(response.data)
        return response.data
    }  catch (error) {
        console.error("Error in fetching experienceList: " + error)
    }
}
