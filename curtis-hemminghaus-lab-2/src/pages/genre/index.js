import { fetchGenreList } from "../../lib/strapi"

export async function getStaticProps() {
    const genreList = await fetchGenreList();
    return {
        props: { genreList }
    }
}
export default function Genre({ genreList }) {
    return (
        <>
            <div>
                <p>Test</p>
                <ul>
                {genreList.data.map((exp, index) => (
                    <li key={index}>
                        <h1>Name: {exp.genreName}</h1>
                        <h3>Genre Desc: {exp.genreDesc}</h3>
                        <h3>Steam Link: {exp.genreSteamLink}</h3>
                        <h3>Favourite Game From Genre: {exp.favouriteGenreGame}</h3>
                        <h3>Is one of my favorites: {exp.isFavorite ? "yes" : "no"}</h3>
                        <img src={"http://localhost:1337" + exp.genreImage?.url} />
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}