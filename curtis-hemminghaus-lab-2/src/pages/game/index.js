import { fetchGameList } from "../../lib/strapi"

export async function getStaticProps() {
    const gameList = await fetchGameList();
    return {
        props: { gameList }
    }
}
export default function Game({ gameList }) {
    return (
        <>
            <div>
                <p>A list of Games I enjoy</p>
                <div id="grid-container" class="grid-container">
                {gameList.data.map((exp, index) => (
                    <div class="card2">
                    <div class="card-body">
                    <div class="productText">
                    <li key={index}>
                        <h1><a href={exp.gameSteamLink} class="linkColor">{exp.gameName}</a></h1>
                        <br></br>
                        <img src={"http://localhost:1337" + exp.gameImage?.url} class="image"/>
                        <br></br>
                        <h3>Hours Played: {exp.gameHoursPlayed}</h3>
                        <br></br>
                        <h3>Achievements Collected: {exp.gameAchievements}</h3>
                        <br></br>
                        <h3>{exp.gameDesc}</h3>
                        <br></br>
                        <h3>Is one of my favorites: {exp.isFavoriteGame ? "Yes" : "No"}</h3>
                        <br></br>
                        <br></br>
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