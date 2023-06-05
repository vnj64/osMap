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
import { Polygon } from 'ol/geom';

const MapWrapper = ({coorMarker, coorPolygon}) => {

    const [ map, setMap ] = useState()
    const [ selectedCoord , setSelectedCoord ] = useState()

    const mapElement = useRef()

    const mapRef = useRef()
    mapRef.current = map


    const geoJes = {
        "type": "FeatureCollection", 
        "features": [
            {
                "type": "Feature", 
                "geometry": {
                    "type": "Polygon", 
                    "coordinates": [
                        [
                            [-78.150789, 38.066723], 
                            [-78.138062, 37.768061], 
                            [-77.733504, 37.778149], 
                            [-77.744596, 38.07692], 
                            [-78.150789, 38.066723]
                        ]
                    ]
                }, 
                "id": "056cfab1-2821-4778-8edc-099a8c66a4a2", 
                "properties": null
            }
        ]
    }
    const geoJsonData = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-78.150789, 38.066723],
                  [-78.138062, 37.768061],
                  [-77.733504, 37.778149],
                  [-77.744596, 38.07692],
                  [-78.150789, 38.066723]
                ]
              ]
            }
          }
        ]
      };

    useEffect(() => {
        const key = 'YbVpn3RV4HKKTCpFsNK9';
        const source = new TileJSON({
        url: `https://api.maptiler.com/maps/basic-v2/tiles.json?key=${key}`,
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
            center: fromLonLat(coorMarker),
            zoom: 13
        })
        });

        const marker = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(
                            fromLonLat(coorMarker)
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

        const allPoin = new VectorLayer({
            source: new VectorSource({
                url: 'https://api.maptiler.com/data/e6b6cbe8-e4cb-40b4-9e9e-a4e7471f65ff/features.json?key=YbVpn3RV4HKKTCpFsNK9',
                format: new GeoJSON(),
            }),
            style: new Style({
                image: new Icon({
                    src: 'https://static.thenounproject.com/png/68978-200.png',
                    width: 50,
                    height: 50
                })
            })
        })

        const feature = new Feature({
            geometry: new Polygon([[[-78.150789, 38.066723], [-78.138062, 37.768061], [-77.733504, 37.778149], [-77.744596, 38.07692], [-78.150789, 38.066723]]]),
            name: 'My Polygon',
        });

        const vectorSource = new VectorSource({
            format: new GeoJSON(),
            url: 'https://api.maptiler.com/data/760304f0-d71a-4e75-8405-35e8bdd55195/features.json?key=YbVpn3RV4HKKTCpFsNK9',
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
                fill: new Fill({
                color: 'rgba(165, 80, 51, 0.8)'
                }),
                stroke: new Stroke({
                color: 'orange',
                width: 2
                })
            })
        });


        // const polygonScreen = new VectorLayer({
        //     source: vectorSource,
        //     style: new Style({
        //         //FILL ЗАЛИВКА
        //         fill: new Fill({
        //             color: 'rgba(165, 80, 51, 0.5)'
        //         }),
        //         //STROKE ОБВОДКА
        //         stroke: new Stroke({
        //             color: 'orange',
        //             width: 2
        //         })
        //     })
        // })

        initialMap.addLayer(vectorLayer);
        // initialMap.addLayer(polygonScreen);
        initialMap.addLayer(marker);
        // initialMap.addLayer(allPoin);
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