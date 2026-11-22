
import { mapValues } from 'lodash';
import hyotsLogoPath from '../assets/franchises/Hoyts.svg';
import eventLogoPath from '../assets/franchises/Event Cinemas.svg';
import bccLogoPath from '../assets/franchises/BCC.png';
import readingLogoPath from '../assets/franchises/Reading.svg';



const data = mapValues({
  hoyts: {
    identifier: 'Hoyts',
    logoUrl: hyotsLogoPath,
  },
  event: {
    identifier: 'Event Cinemas',
    logoUrl: eventLogoPath,
  },
  bcc: {
    identifier: 'BCC',
    logoUrl: bccLogoPath,
  },
  reading: {
    identifier: 'Reading',
    logoUrl: readingLogoPath,
  },
  unknown: {
    identifier: null,
    name: 'Unknown',
  }
}, (value, key, obj) => {
  return {
    id: key,
    ...value,
  }
});

export const matchCinemaToFranchise = (cinema) => {
  
  

  
  const matchingFranchiseKey = Object.entries(data).find(([key, franchise]) => (
    franchise.identifier ? cinema.name.includes(franchise.identifier) : true
  ))[0];

  
  
  
  const franchise = data[matchingFranchiseKey];
  if (!franchise.breakdown) {
    franchise.breakdown = {};
  }
  if (!franchise.breakdown[cinema.countryCode]) {
    franchise.breakdown[cinema.countryCode] = 1;
  } else {
    franchise.breakdown[cinema.countryCode] += 1;
  }

  return matchingFranchiseKey;
};

export default data;