import { List, Divider } from "@mui/material";
import CinemaListItem from './CinemaListItem';

const CinemaListAside = ({ cinemas, Header = null }) => {
  return (
    <List sx={{ maxHeight: 'calc(100vh - 112px)', overflowY: 'auto' }}>
      <Header {...{ cinemas }} />
      {Header && <Divider />}
      {}
      {
}
      {cinemas.map((cinema, idx) => (
        <CinemaListItem {...cinema} key={idx} />
      ))}
    </List>
  )
}
export default CinemaListAside;