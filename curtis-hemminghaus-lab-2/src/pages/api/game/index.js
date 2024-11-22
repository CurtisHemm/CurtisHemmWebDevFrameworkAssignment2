import { fetchGameList } from "../../lib/strapi"

export async function getStaticProps() {
    const genreList = await fetchGameList();
    return {
        props: { gameList }
    }
}
export default function Genre({ gameList }) {
    return (
        <>
            <div>
                <p>A list of Games I enjoy</p>
                <div id="grid-container" class="grid-container">
                {genreList.data.map((exp, index) => (
                    <div class="card2">
                    <div class="card-body">
                    <div class="productText">
                    <li key={index}>
                        <h1>Name: <a href={exp.genreSteamLink} class="linkColor">{exp.genreName}</a></h1>
                        <br></br>
                        <h3>Genre Desc: {exp.genreDesc}</h3>
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