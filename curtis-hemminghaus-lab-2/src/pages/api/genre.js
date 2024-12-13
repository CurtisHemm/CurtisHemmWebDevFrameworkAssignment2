import axios from 'axios'
const STRAPI_URL = process.env.STRAPI_API_URL;

export default async function handler(request, response) {
    try {
        const genres = await axios.get(STRAPI_URL + "genres?populate=genreImage")
        response.status(200).json(genres.data)
    } catch (err) {
        response.status(400).json({error: err})
    }
}