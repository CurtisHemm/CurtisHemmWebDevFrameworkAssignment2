import { fetchGameList } from "../../lib/strapi"

export async function getStaticProps() {
    const gameList = await fetchGameList();
    return {
        props: { gameList }
    }
}
export default function FavoriteGame({ gameList }) {
    return (
        <>
            <div>
                <h1>My Favorite Games </h1>
                <div class="container">
                {gameList.data.filter(exp => exp.isFavoriteGame)
                .map((exp, index) => (
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
                    </li>
                    </div>
                    </div>
                    
                    
                ))}
                
                </div>
                </div>
        </>
        
    )
}