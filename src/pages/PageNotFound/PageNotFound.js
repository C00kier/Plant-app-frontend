import "./PageNotFound.css";

//assets
import theSimpsonsGif from "../../assets/pageNotFound/the_simpsons_bush.gif"

export default function PageNotFound() {
    return (
        <div className="page-not-found-container flex-column-center-center">
            <p className="page-not-found-header">The page you are looking for does not exist...</p>
            <img className="page-not-found-gif"src={theSimpsonsGif} alt="Homer hides in the bush"/>
        </div>
    )
}