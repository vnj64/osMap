import UploadImage from "../../components/UploadImage";
import satellite from '../../assets/satellite.svg';
import satelliteShadow from '../../assets/satelliteShadow.svg'
import './index.css';

const Main = () => {

    return (
        <div className="main">
                <div className="main__content">
                        <h1 className="main__title">
                            SpaceShip<br />
                            <span className="main__title--dash">-</span><br />
                            Загрузи<br />
                            свое фото
                        </h1>
                        <h3 className="main__subtitle">Сайт предназначен для публикации тифф фотографий</h3>
                        <UploadImage/>
                </div>
                <div className="main__images">
                    <img className="main__spaceship-image" src={satellite} alt="Фотка спутника для визуальной части сайта" />
                    <img className="main__spaceship-shadow" src={satelliteShadow} alt="Тень от спутника" />
                </div>
        </div>
    );
}

export default Main;