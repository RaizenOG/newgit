import React, { useState } from "react";
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";
import result from "./result.json";

const MapComponent = () => {
    const coordinates = result.features[0].geometry.coordinates;
    const swappedCoordinates = coordinates.map(coord => [coord[1], coord[0]]);

    const markerStep = Math.round(swappedCoordinates.length / 20);
    const markers = swappedCoordinates.filter(
        (coord, index) => index % markerStep === 0
    );

    const [selectedMarkers, setSelectedMarkers] = useState([]);

    const handleMarkerClick = index => {
        let updatedMarkers = [];

        if (selectedMarkers.length === 2) {
            updatedMarkers = [];
        } else if (selectedMarkers.length === 1) {
            const startMarkerIndex = selectedMarkers[0];
            const endMarkerIndex = index;
            const startCoordinateIndex = markerStep * startMarkerIndex;
            const endCoordinateIndex = markerStep * endMarkerIndex;

            const lineCoordinates = swappedCoordinates.slice(startCoordinateIndex, endCoordinateIndex + 1);

            updatedMarkers = [startMarkerIndex, endMarkerIndex];
        } else {
            updatedMarkers = [index];
        }

        setSelectedMarkers(updatedMarkers);
    };

    const renderLines = () => {
        if (selectedMarkers.length === 2) {
            const startMarkerIndex = selectedMarkers[0];
            const endMarkerIndex = selectedMarkers[1];
            const startCoordinateIndex = markerStep * startMarkerIndex;
            const endCoordinateIndex = markerStep * endMarkerIndex;

            const lineCoordinates = swappedCoordinates.slice(startCoordinateIndex, endCoordinateIndex + 1);

            return (
                <Polyline
                    geometry={lineCoordinates}
                    options={{
                        strokeColor: "#FF0000",
                        strokeWidth: 3,
                        strokeOpacity: 0.5
                    }}
                />
            );
        }

        return null;
    };

    return (
        <YMaps>
            <Map
                defaultState={{ center: swappedCoordinates[0], zoom: 14 }}
                style={{ width: "100%", height: "1200px" }}
            >
                <Polyline
                    geometry={swappedCoordinates}
                    options={{
                        strokeColor: "#000000",
                        strokeWidth: 3,
                        strokeOpacity: 0.5
                    }}
                />

                {markers.map((coord, index) => {
                    const isSelected = selectedMarkers.includes(index);
                    const options = {
                        preset: "islands#circleDotIcon",
                        iconColor: isSelected ? "#FF0000" : "#0000FF"
                    };

                    return (
                        <Placemark
                            key={index}
                            geometry={{ coordinates: coord, type: "Point" }}
                            options={options}
                            onClick={() => handleMarkerClick(index)}
                        />
                    );
                })}

                {renderLines()}
            </Map>
        </YMaps>
    );
};

export default MapComponent;
