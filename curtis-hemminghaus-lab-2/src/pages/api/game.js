import axios from 'axios'
const STRAPI_URL = process.env.STRAPI_API_URL;

export default async function handler(request, response) {
    try {
        const games = await axios.get(STRAPI_URL + "games?populate=gameImage")
        response.status(200).json(games.data)
    } catch (err) {
        response.status(400).json({error: err})
    }
}