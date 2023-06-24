import React, { useState, useEffect, useRef } from 'react';
import './index.css';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, transform } from 'ol/proj';
import Style from 'ol/style/Style';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Overlay from 'ol/Overlay';
import { useParams, useNavigate } from 'react-router-dom';
import { MAP_ROUTE } from '../Routring/urls';
import { toStringXY } from 'ol/coordinate';
import Layers from './Layers';

const MapWrapper = () => {
  const { lat, lng } = useParams();
  const navigate = useNavigate();
  const mapElement = useRef();
  const mapRef = useRef(null);
  const popupRef = useRef();
  const [map, setMap] = useState(null);
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [centerCoord, setCenterCoord] = useState([lat, lng]);
  const [propertiesPopup, setPropertiesPopup] = useState({});

  const checkTarget = (lat, lng) => {

    console.log(typeof lat, lng);

    if (lat == 0 && lng == 0) {
      return new View({
        constrainResolution: true,
        center: fromLonLat([0, 0]),
        zoom: 1,
      });
    } 

    return new View({
      constrainResolution: true,
      center: fromLonLat([lat, lng]),
      zoom: 8,
    });
  }

  useEffect(() => {
    if (!mapRef.current) {
      const initialMap = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
            }),
          }),
        ],
        target: mapElement.current,
        view: checkTarget(lat, lng),
      });

      const vectorSource = new VectorSource({
        format: new GeoJSON(),
        url: 'http://localhost:8000/api/polygons'
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          fill: new Fill({
            color: 'rgba(165, 80, 51, 0.5)',
          }),
          stroke: new Stroke({
            color: 'orange',
            width: 2,
          }),
        }),
      });

      const popup = new Overlay({
        element: popupRef.current,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });

      initialMap.on('click', (evt) => {
        const clickedCoord = evt.coordinate;
        const features = initialMap.getFeaturesAtPixel(evt.pixel);

        if (features && features.length > 0) {
          const clickedFeature = features[0];
          const geometryType = clickedFeature.getGeometry().getType();

          if (geometryType === 'Polygon') {
            popup.setPosition(clickedCoord);
            initialMap.addOverlay(popup);

            const properties = clickedFeature.getProperties();
            setPropertiesPopup(properties);
          }
        } else {
          popup.setPosition(undefined);
          initialMap.removeOverlay(popup);
        }
      });

      initialMap.addLayer(vectorLayer);
      initialMap.on('click', handleMapClick);
      initialMap.on('moveend', handleMapMove);

      mapRef.current = initialMap;
      setMap(initialMap);
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(null);
        mapRef.current.dispose();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      navigate(`${MAP_ROUTE}/${centerCoord[0]}/${centerCoord[1]}`);
    }
  }, [centerCoord, navigate]);

  const handleMapMove = () => {
    const initialMap = mapRef.current;
    if (initialMap) {
      const center = initialMap.getView().getCenter();
      const transformedCenter = transform(center, 'EPSG:3857', 'EPSG:4326');
      setCenterCoord(transformedCenter);
    }
  };

  const handleMapClick = (event) => {
    const initialMap = mapRef.current;
    if (initialMap) {
      const clickedCoord = initialMap.getCoordinateFromPixel(event.pixel);
      const transformedCoord = transform(
        clickedCoord,
        'EPSG:3857',
        'EPSG:4326'
      );
      setSelectedCoord(transformedCoord);
    }
  };

  const closePopup = () => {
    const initialMap = mapRef.current;
    if (initialMap) {
      const popup = initialMap.getOverlays().item(0);
      popup.setPosition(undefined);
      initialMap.removeOverlay(popup);
    }
  };

  return (
    <div>
      <div id="map" ref={mapElement}></div>

      <div className="ol-popup" id="popup" ref={popupRef}>
        <a href="#" id="popup-closer" className="ol-popup-closer" onClick={closePopup}></a>
        <span>Имя: {propertiesPopup.name}</span>
        <span>Дата добавление: {propertiesPopup.datePublish}</span>
        {propertiesPopup.images &&  <img src={propertiesPopup.images} alt="фотка которую сделал спутник" />}
      </div>
      <Layers map={map} />
      <div className="clicked-coord-label">
        <p>{selectedCoord ? toStringXY(selectedCoord, 5) : ''}</p>
      </div>
    </div>
  );
};

export default MapWrapper;
