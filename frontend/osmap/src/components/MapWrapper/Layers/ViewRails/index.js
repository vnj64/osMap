import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

const ViewRails = ({ map }) => {
    const [isShow, setIsShow] = useState(false);
    const [tileVector, setTileVector] = useState(null);

    const handleShowPorts = () => {
        let sourcePorts = null;
        if (!isShow) {
            sourcePorts = new VectorSource({
                url: "https://api.maptiler.com/data/1f69d163-e8d6-4a59-afff-21a81152eb63/features.json?key=YbVpn3RV4HKKTCpFsNK9",
                format: new GeoJSON()
            });

            const newTileVector = new VectorLayer({
                source: sourcePorts,
                style: new Style({
                    fill: new Fill({
                        color: 'green',
                      }),
                    stroke: new Stroke({
                    color: 'black',
                    width: 2
                    }),
                })
            });

            map.addLayer(newTileVector);
            setTileVector(newTileVector);
            setIsShow(true);
        } else {
            if (tileVector) {
                map.removeLayer(tileVector);
                setTileVector(null);
            }
            setIsShow(false);
        }
    };

    return (
        <div 
            className="layers__image"
            onClick={handleShowPorts}
        >
            <img className="layers__image "
                src="https://cdn-icons-png.flaticon.com/512/84/84805.png"
                alt="картинка показывающая морские железные дороги в северной америке"
            />
        </div>
    );
};

export default ViewRails;
