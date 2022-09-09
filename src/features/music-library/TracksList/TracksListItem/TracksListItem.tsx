import { Track } from '@models/Track';
import { ListItem } from './TracksListItem.styles';

export interface TracksListItemProps {
  track: Track;
  isSelected: boolean;
  onClick: (track: Track) => void;
}

const TracksListItem = ({ track, isSelected, onClick }: TracksListItemProps) => {
  return (
    <ListItem isSelected={isSelected} onClick={() => onClick(track)}>
      <img src={track.cover} />
      <div>
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </div>
    </ListItem>
  );
};

export default TracksListItem;
