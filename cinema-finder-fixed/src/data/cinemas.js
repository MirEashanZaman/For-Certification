import auCinemas from './auCinemas.json';
import nzCinemas from './nzCinemas.json';
import { countBy } from 'lodash';
import { matchCinemaToFranchise } from './franchises';


const addKeyToObject = (key, value) => {
  
  return (obj) => {
    
    return {
      ...obj,
      [key]: value,
    }
  }
}


const cinemas = [
  ...auCinemas.map(addKeyToObject('countryCode', 'au')),
  ...nzCinemas.map(addKeyToObject('countryCode', 'nz'))
].map(cinema => {
  
  const franchise = matchCinemaToFranchise(cinema);
  return addKeyToObject('franchise', franchise)(cinema);
});

export const breakdown = countBy(cinemas, 'countryCode');
export default cinemas;