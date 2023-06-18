import { useLocation, useNavigate, useResolvedPath } from "react-router-dom";
import { MAIN_ROUTE, MAP_ROUTE } from "../Routring/urls";
import "./index.css";

const Header = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const isMainPage = location.pathname === MAIN_ROUTE;

    return (
        <nav className={isMainPage ? "header header--main" : "header"}>
            <a className="header__logo" onClick={() => navigate(MAIN_ROUTE)}>SpaceShip</a>
            {
                isMainPage &&
                <button className="button header__button" onClick={() => navigate(MAP_ROUTE)}>
                    <span className="button__text">Карта</span>
                </button>
            }
        </nav>
    );
}

export default Header;