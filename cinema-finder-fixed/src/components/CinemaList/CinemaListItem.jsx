import { Chip, IconButton, ListItem, ListItemText } from "@mui/material";
import { MdCall, MdOutlineLocationOn } from 'react-icons/md';
import { format } from 'd3-format';

const dispatchMapSnapTo = (lat, lng) => {
  
  
  console.log('triggering `map.snapTo` event with args: ', `lat: ${lat}, lng: ${lng}`)
  dispatchEvent(new CustomEvent('map.snapTo', { detail: { lat, lng } }))
}

const CinemaListItem = ({ name, lat, lng, phoneNumber, distance, ...otherProps }) => {
  return (
    <ListItem>
      <ListItemText>
        {name}
        {distance && (<Chip size="small" sx={{ ml: 1 }} label={`${format(',.1f')(distance)} km`} />)}
      </ListItemText>
      {
        phoneNumber && (
          <IconButton component='a' href={`tel:${phoneNumber}`}>
            <MdCall />
          </IconButton>
        )
      }
      <IconButton onClick={() => dispatchMapSnapTo(lat, lng)}>
        <MdOutlineLocationOn />
      </IconButton>
    </ListItem>
  );
};
export default CinemaListItem;