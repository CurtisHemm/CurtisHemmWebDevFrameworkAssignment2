import { useRouter } from "next/router";    // useRouter needed to handle current page
import { fetchGameList } from "../../lib/strapi";

// One card per page
const gamesPerPage = 1;


export async function getStaticProps({ params }) {
    const gameList = await fetchGameList();

    const favoriteGames = gameList.data.filter(exp => exp.isFavoriteGame);    // Filters through the data and only grabs favorite games

    const page = parseInt(params.page, 10); // Retrieves page as an integer

    const startIndex = (page - 1) * gamesPerPage; // Calculates the starting range of games to display
    const endIndex = startIndex + gamesPerPage; // Calculates the ending range of games to display

    const gamesForPage = favoriteGames.slice(startIndex, endIndex); // Gets array of games to display for 1 page based on the range we got from start and end index

    // Returns the favorite games that will be displayed, and the number of favorite games their are
    return {
        props: { gamesForPage, totalGames: favoriteGames.length }
    };
}

export async function getStaticPaths() {
    const gameList = await fetchGameList();
    const favoriteGames = gameList.data.filter(exp => exp.isFavoriteGame); // Filters through the data and only grabs favorite games

    const totalPages = Math.ceil(favoriteGames.length / gamesPerPage); // Gets the total number of pages

    // Creates an array of page objects, and creates a path for each page
    const paths = Array.from({ length: totalPages }, (_, index) => ({
        params: { page: (index + 1).toString() }, 
    }));

    // Returns all the possbile url paths
    return {
        paths,
        fallback: false
    };
}

export default function FavoriteGame({ gamesForPage, totalGames }) {
    const router = useRouter();   // Gets access to the current route's parameters
    const { page } = router.query; // Gets the page from the query of the router

    const currentPage = page ? parseInt(page, 10) : 1;    // Sets the current page number based on the url and parses it. If the page doesn't exist, it defaults to page 1
    const totalPages = Math.ceil(totalGames / gamesPerPage);  // Calculates the total pages needed

    return (
        <>
            <div>
                <h1>My Favorite Games</h1>
                <div class="container">
                    {gamesForPage.map((exp, index) => (
                        <div class="card-body" key={index}>
                            <div class="productText">
                                <li>
                                    <h1><a href={exp.gameSteamLink} class="linkColor"> {exp.gameName}</a></h1>
                                    <br/>
                                    <img src={"http://localhost:1337" + exp.gameImage?.url} class="image"/>
                                    <br />
                                    <h3>Hours Played: {exp.gameHoursPlayed}</h3>
                                    <br/>
                                    <h3>Achievements Collected: {exp.gameAchievements}</h3>
                                    <br/>
                                    <h3>{exp.gameDesc}</h3>
                                    <br/>
                                    <div>   
                                    {totalPages > 1 && (  // Checks if theres more than 1 page to display more pagination
                                        <>
                                            {
                                                currentPage > 1 && (<a href={`/favoriteGame/${currentPage - 1}`} class="prev">Previous</a>)  // If there is a page before, display previous
                                            }
                                            {
                                                currentPage < totalPages && (<a href={`/favoriteGame/${currentPage + 1}`} class="next">Next</a>) // If there is a page after, display next
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
    );
}