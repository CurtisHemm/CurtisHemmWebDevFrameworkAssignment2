import { fetchGenreList } from "../../lib/strapi"

const gamesPerPage = 1;

export async function getStaticProps() {
    const genreList = await fetchGenreList();
    return {
        props: { genreList }
    }
}
export default function FavoriteGame({ genreList }) {
    return (
        <>
            <div>
                <h1>My Favorite Genres </h1>
                <div class="container">
                {genreList.data.filter(exp => exp.isFavorite)
                .map((exp, index) => (
                    <div class="card-body">
                    <div class="productText">
                    <li key={index}>
                    <h1><a href={exp.genreSteamLink} class="linkColor">{exp.genreName}</a></h1>
                        <br></br>
                        <h3>{exp.genreDesc}</h3>
                        <br></br>
                        <img src={"http://localhost:1337" + exp.genreImage?.url} class="image"/>
                        <br></br>
                        <h3>Favourite Game From Genre: <a href={exp.favouriteGenreGameSteam}>{exp.favouriteGenreGame}</a></h3>
                    </li>
                    </div>
                    </div>
                    
                    
                ))}
                
                </div>
                </div>
        </>
        
    )
}