import { Track } from '@models/Track';
import { ArtistName, ListItem, TrackName } from './TracksListItem.styles';

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
        <TrackName>{track.name}</TrackName>
        <ArtistName>{track.artist}</ArtistName>
      </div>
    </ListItem>
  );
};

export default TracksListItem;
