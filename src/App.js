import React from 'react';
import { YMaps, Map, Placemark, Polyline,  } from 'react-yandex-maps';

const YandexMapComponent = () => {

  const routeCoordinates = [
    [55.779794490894915, 37.60226590556786],
    [55.779721067294, 37.60234032884161],

  ];

  return (
      <YMaps>
        <Map
            defaultState={{ center: [55.7797, 37.6022], zoom: 13 }}
            style={{ width: '100%', height: '400px' }}
        >

          {routeCoordinates.map((coordinate, index) => (
              <Placemark key={index} geometry={coordinate} />
          ))}
            
          <Polyline geometry={routeCoordinates} />

        </Map>
      </YMaps>
  );
};

export default YandexMapComponent;
