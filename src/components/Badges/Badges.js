import "./Badges.css";
import growingPlant from '../../../src/assets/gamePrgress/rośl-removebg-preview.png';
export default function Badges() {
    return (
        <>
            <div className="user-game-progress-div">
                <div className="score-div">
                    <div className="score-text-div">
                        <h1>Score: 10</h1>
                    </div>
                    <div className="user-game-title-div">
                        <h1>"Nowicjusz roślinny"</h1>
                        <h5>Brakuje Ci 20 pkt do kolejnego poziomu</h5>
                    </div>
                </div>
                <div className="growing-plant-div">
                    <img src={growingPlant} alt={growingPlant}/>
                </div>
            </div>
        </>
    )
}