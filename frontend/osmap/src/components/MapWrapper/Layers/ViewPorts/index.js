import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

const ViewPorts = ({ map }) => {
    const [isShow, setIsShow] = useState(false);
    const [tileVector, setTileVector] = useState(null);

    const handleShowPorts = () => {
        if (!isShow) {
            const sourcePorts = new VectorSource({
                url: "https://api.maptiler.com/data/32d3998a-b1cf-4ef2-9fbe-97c1437cdff8/features.json?key=YbVpn3RV4HKKTCpFsNK9",
                format: new GeoJSON()
            });

            const newTileVector = new VectorLayer({
                source: sourcePorts,
                style: new Style({
                    image: new Icon({
                        src: "https://icon-library.com/images/port-icon-png/port-icon-png-9.jpg",
                        size: [512, 512],
                        scale: 0.03
                    })
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
                src="https://www.naturalearthdata.com/wp-content/uploads/2009/09/thumb_ports.png"
                alt="картинка показывающая морские порты мира"
            />
        </div>
    );
};

export default ViewPorts;
