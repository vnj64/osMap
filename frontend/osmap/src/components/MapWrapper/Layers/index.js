import { useState } from "react";
import SwapMap from "./SwapMap";
import ViewPorts from "./ViewPorts";
import ViewRails from "./ViewRails";
import "./index.css";
import layersIcon from "../../../assets/layersIcon.png"

const Layers = ({map}) => {

    const [show, setShow] = useState(false);
    
    return (
        <>
            <button className="button-layers" onClick={() => setShow(!show)} >
                    <img className="button-layers__icon" src={layersIcon} alt='кнопка для просмотра доступных слоев' />
            </button>
            {
                show &&
                <div className="layers">
                    <SwapMap map={map} />
                    <ViewPorts map={map} />
                    <ViewRails map={map} />
                </div>
            }
        </>
    );
}

export default Layers;