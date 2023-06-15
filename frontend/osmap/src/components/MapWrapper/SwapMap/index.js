import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import TileJSON from "ol/source/TileJSON";
import { useState } from "react";

const SwapMap = ({ map }) => {
    const [isSatellite, setIsSatellite] = useState(false);

    const key = 'YbVpn3RV4HKKTCpFsNK9';
    const handleSwapMap = () => {
        let sourceMap = null;
        if (!isSatellite) {
            sourceMap = new TileJSON({
                url: `https://api.maptiler.com/maps/hybrid/tiles.json?key=${key}`,
                tileSize: 512,
                crossOrigin: 'anonymous'
            });
            setIsSatellite(true);
        } else {
            sourceMap = new XYZ({
                url: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
            });
            setIsSatellite(false);
        }

        const newTileLayer = new TileLayer({
            source: sourceMap,
        });
        map.getLayers().removeAt(0);
        map.getLayers().insertAt(0, newTileLayer);
        console.log(map.getLayers());
    };

    return (
        <div
            onClick={handleSwapMap}
            style={{
                position: "absolute",
                cursor: "pointer",
                right: "0",
                width: "100px",
                height: "100px",
                backgroundColor: "green",
            }}
        >
            {isSatellite ? (
                <img style={{width: '100px', height: '100px'}}
                    src="https://cloud.maptiler.com/static/img/maps/basic-v2.png?t=1677738994"
                    alt="картинка базового режима отображении карты"
                />
            ) : (
            <img style={{width: '100px', height: '100px'}}
                src="https://cloud.maptiler.com/static/img/maps/hybrid.png?t=1677738994"
                alt="картинка режима отображения со спутника"
            />
            )}
        </div>
    );
};

export default SwapMap;
