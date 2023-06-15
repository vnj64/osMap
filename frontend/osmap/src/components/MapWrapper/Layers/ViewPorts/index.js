import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

const ViewPorts = ({ map }) => {
    const [isShow, setIsShow] = useState(false);

    const handleShowPorts = () => {

        console.log(map.getLayers());
        let sourcePorts = null;
        if (!isShow) {
            sourcePorts = new VectorSource({
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

            map.getLayers().insertAt(1, newTileVector);
            console.log(map.getLayers());
            setIsShow(true);
        } else {
            setIsShow(false);
            map.getLayers().removeAt(1);
        }
    };

    return (
        <div
            onClick={handleShowPorts}
            style={{
                position: "absolute",
                cursor: "pointer",
                top: "100px",
                right: "0",
                width: "100px",
                height: "100px",
                backgroundColor: "green",
            }}
        >
            <img style={{width: '100px', height: '100px'}}
                src="https://www.naturalearthdata.com/wp-content/uploads/2009/09/thumb_ports.png"
                alt="картинка показывающая морские порты мира"
            />
        </div>
    );
};

export default ViewPorts;
