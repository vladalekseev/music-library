import { Track } from '@models/Track';
import TracksListItem from './TracksListItem/TracksListItem';

interface TracksListProps {
  tracks: Track[];
  selectedTrack: Track | null;
  setSelectedTrack: (track: Track) => void;
}

const TracksList = ({ tracks, selectedTrack, setSelectedTrack }: TracksListProps) => {
  return (
    <ul>
      {tracks.map((track) => (
        <TracksListItem
          key={track.id}
          onClick={setSelectedTrack}
          track={track}
          isSelected={selectedTrack?.id === track.id}
        />
      ))}
    </ul>
  );
};

export default TracksList;
