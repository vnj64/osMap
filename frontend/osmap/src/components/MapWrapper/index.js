// react
import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import markerImage from '../../assets/placeholder.png';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {fromLonLat} from 'ol/proj';
import Style from 'ol/style/Style.js';
import Icon from 'ol/style/Icon.js';
import GeoJSON from 'ol/format/GeoJSON.js';


// import XYZ from 'ol/source/XYZ'
import {transform} from 'ol/proj'
import {format, toStringXY} from 'ol/coordinate';
// import {add} from 'ol/coordinate';
// import {ol} from 'ol';
// import TileJSON from 



import TileJSON from 'ol/source/TileJSON.js';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const MapWrapper = () => {

    const [ map, setMap ] = useState()
    const [ selectedCoord , setSelectedCoord ] = useState()

    const mapElement = useRef()

    const mapRef = useRef()
    mapRef.current = map


    useEffect(() => {
        const key = 'YbVpn3RV4HKKTCpFsNK9';
        const source = new TileJSON({
            
        url: `https://api.maptiler.com/maps/hybrid/tiles.json?key=${key}`,
        tileSize: 512,
        crossOrigin: 'anonymous'
        });

        const initialMap = new Map({
        layers: [
            new TileLayer({
            source: source
            })
        ],
        target: mapElement.current,
        view: new View({
            constrainResolution: true,
            center: fromLonLat([39.98132, 43.40076]),
            zoom: 13
        })
        });

        const marker = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(
                            fromLonLat([39.98132, 43.40076])
                        )
                    })
                ],
            }),
            style: new Style({
                image: new Icon({
                    src: markerImage,
                    width: 50,
                    height: 50,
                    anchor: [0.5, 1]
                })
            })
        })

        const polygonScreen = new VectorLayer({
            source: new VectorSource({
                url: 'https://api.maptiler.com/data/7e1ac090-be8d-4d3b-870c-660589ba54df/features.json?key=YbVpn3RV4HKKTCpFsNK9',
                format: new GeoJSON(),
            }),
            style: new Style({
                //FILL ЗАЛИВКА
                fill: new Fill({
                    color: 'rgba(165, 80, 51, 0.8)'
                }),
                //STROKE ОБВОДКА
                stroke: new Stroke({
                    color: 'orange',
                    width: 2
                })
            })
        })

        initialMap.addLayer(polygonScreen);
        initialMap.addLayer(marker);
        initialMap.on('click', handleMapClick);

        setMap(initialMap)
    }, [])


    const handleMapClick = (event) => {
    
        // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
        //  https://stackoverflow.com/a/60643670
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    
        // transform coord to EPSG 4326 standard Lat Long
        const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
    
        // set React state
        setSelectedCoord(transormedCoord)
        
      }


    return (
        <>
            <div id="map" ref={mapElement}></div>

            <div className="clicked-coord-label">
                <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
            </div>
        </>
    );
}

export default MapWrapper;