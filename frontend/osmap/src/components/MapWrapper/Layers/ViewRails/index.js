import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

const ViewRails = ({ map }) => {
    const [isShow, setIsShow] = useState(false);

    const handleShowPorts = () => {

        console.log(map.getLayers());
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

            map.getLayers().insertAt(2, newTileVector);
            console.log(map.getLayers());
            setIsShow(true);
        } else {
            setIsShow(false);
            map.getLayers().removeAt(2);
            // map.getLayers().remove(newTileVector);
        }
    };

    return (
        <div
            onClick={handleShowPorts}
            style={{
                position: "absolute",
                cursor: "pointer",
                top: "200px",
                right: "0",
                width: "100px",
                height: "100px",
                backgroundColor: "white",
            }}
        >
            <img style={{width: '100px', height: '100px'}}
                src="https://cdn-icons-png.flaticon.com/512/84/84805.png"
                alt="картинка показывающая морские железные дороги в северной америке"
            />
        </div>
    );
};

export default ViewRails;
