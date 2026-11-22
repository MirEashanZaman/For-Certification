import { useEffect, useMemo } from "react";
import { useGeolocated } from "react-geolocated";
import { point } from "@turf/helpers";
import distance from "@turf/distance";
import { sortBy, memoize } from "lodash";
import allCinemas from "./cinemas";



const cinemasWithPoints = allCinemas.map((cinema) => ({
  ...cinema,
  loc: point([cinema.lng, cinema.lat])
}));

const computeCinemaDistance = memoize((lat, lng) => {
  
  const location = point([lng, lat]);

  
  
  return sortBy(
    cinemasWithPoints.map((cinema) => ({
      ...cinema,
      distance: distance(location, cinema.loc)
    })),
    "distance"
  );
});

const useNearbyCinemas = () => {
  
  const {
    coords,
    getPosition,
    isGeolocationAvailable,
    isGeolocationEnabled
  } = useGeolocated();
  useEffect(() => {
    if (!isGeolocationEnabled) {
      getPosition();
    }
    
    
  }, []);

  const cinemas = useMemo(() => {
    if (!coords) return [];

    
    return computeCinemaDistance(coords.latitude, coords.longitude).slice(
      0,
      15
    );
  }, [coords]);

  
  return {
    isGeolocationAvailable,
    isGeolocationEnabled,
    coords,
    cinemas
  };
};
export default useNearbyCinemas;
