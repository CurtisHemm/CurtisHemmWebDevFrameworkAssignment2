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
                <h1>A list of Game Genres I enjoy</h1>
                <div id="grid-container" class="grid-container">
                {genreList.data.map((exp, index) => (
                    <div class="card2">
                    <div class="card-body">
                    <div class="productText">
                    <li key={index}>
                        <h1><a href={exp.genreSteamLink} class="linkColor">{exp.genreName}</a></h1>
                        <br></br>
                        <h3>{exp.genreDesc}</h3>
                        <br></br>
                        <h3>Is one of my favorites: {exp.isFavorite ? "Yes" : "No"}</h3>
                        <br></br>
                        <img src={"http://localhost:1337" + exp.genreImage?.url} class="image"/>
                        <br></br>
                        <h3>Favourite Game From Genre: <a href={exp.favouriteGenreGameSteam}>{exp.favouriteGenreGame}</a></h3>
                    </li>
                    </div>
                    </div>
                    </div>
                    
                ))}
                </div>
                
            </div>
        </>
    )
}