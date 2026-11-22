import loadable from '@loadable/component';
import createPersistedState from 'use-persisted-state';

const usePersistedMapTypeState = createPersistedState('app.mapType');

const Maps = {
  maplibre: loadable(() => import('./MaplibreMap')),
  leaflet: loadable(() => import('./LeafletMap')),
}

export const mapTypes = Object.keys(Maps);
export const useMapType = () => {
  const [mapType, setMapType] = usePersistedMapTypeState(mapTypes[0]);
  return [mapType, setMapType];
}

const Map = (props) => {
  
  
  const [mapType] = useMapType();
  const Component = Maps[mapType];
  return <Component {...props} />
}
export default Map;