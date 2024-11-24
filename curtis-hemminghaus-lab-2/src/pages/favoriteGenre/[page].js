import { useRouter } from "next/router"; // useRouter needed to handle current page
import { fetchGenreList } from "../../lib/strapi";

// One card per page
const genresPerPage = 1;

export async function getStaticProps({ params }) {
    const genreList = await fetchGenreList();

    const favoriteGenres = genreList.data.filter(exp => exp.isFavorite); // Filters through the data and only grabs favorite genres

    const page = parseInt(params.page, 10); // Retrieves page as an integer

    const startIndex = (page - 1) * genresPerPage; // Calculates the starting range of games to display
    const endIndex = startIndex + genresPerPage; // Calculates the ending range of games to display

    const genresForPage = favoriteGenres.slice(startIndex, endIndex); // Gets array of genres to display for 1 page based on the range we got from start and end index

    // Returns the favorite genres that will be displayed, and the number of favorite genres there are
    return {
        props: { genresForPage, totalGenres: favoriteGenres.length }
    }
}

export async function getStaticPaths() {
    const genreList = await fetchGenreList();
    const favoriteGenres = genreList.data.filter(exp => exp.isFavorite); // Filters through the data and only grabs favorite genres

    const totalPages = Math.ceil(favoriteGenres.length / genresPerPage); // Gets the total number of pages

    // Creates an array of page objects, and creates a path for each page
    const paths = Array.from({ length: totalPages }, (_, index) => ({
        params: { page: (index + 1).toString() },
    }));

    // Returns all possbile url paths
    return {
        paths,
        fallback: false
    };
}
export default function FavoriteGenre({ genresForPage, totalGenres }) {
    const router = useRouter(); // Gets access to the current route's parameters
    const { page } = router.query; // Gets the page from the query of the router

    const currentPage = page ? parseInt(page, 10) : 1; // Sets the current page number based on the url and parses it. If the page doesn't exist, it defaults to page 1
    const totalPages = Math.ceil(totalGenres / genresPerPage); // Calculates the total pages needed

    return (
        <>
            <div>
                <h1>My Favorite Genres </h1>
                <div class="container">
                {genresForPage.map((exp, index) => ( 
                    <div class="card-body" key={index}>
                    <div class="productText">
                    <li>
                    <h1><a href={exp.genreSteamLink} class="linkColor">{exp.genreName}</a></h1>
                        <br/>
                        <h3>{exp.genreDesc}</h3>
                        <br/>
                        <img src={"http://localhost:1337" + exp.genreImage?.url} class="image"/>
                        <br/>
                        <h3>Favourite Game From Genre: <a href={exp.favouriteGenreGameSteam}>{exp.favouriteGenreGame}</a></h3>
                        <br/>
                        <div>
                        {totalPages > 1 && (  // Checks if theres more than 1 page to display more pagination
                            <>
                                {
                                    currentPage > 1 && (<a href={`/favoriteGenre/${currentPage - 1}`} class="prev">Previous</a>)  // If there is a page before, display previous
                                }
                                {
                                    currentPage < totalPages && (<a href={`/favoriteGenre/${currentPage + 1}`} class="next">Next</a>) // If there is a page after, display next
                                }
                            </> 
                        )}
                        </div>
                    </li>
                    </div>
                    </div>     
                ))}
                </div>
                </div>
        </>
    )
}