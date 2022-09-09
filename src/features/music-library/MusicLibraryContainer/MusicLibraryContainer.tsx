import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@app/store';
import { Track } from '@models/Track';
import TracksList from '../TracksList/TrackList';
import { fetchTracks } from '../musicLibraryReducer';
import { Sidebar, Title } from './MusicLibraryContainer.styles';

const MusicLibraryContainer = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.musicLibrary.tracks);
  const isLoading = useAppSelector((state) => state.musicLibrary.isLoading);
  const isError = useAppSelector((state) => state.musicLibrary.isError);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  useEffect(() => {
    if (tracks.length) {
      setSelectedTrack(tracks[0]);
    }
  }, [tracks]);

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
  };

  return (
    <main>
      <Sidebar>
        <Title>Library</Title>
        {isError && <p>Failed to load tracks</p>}
        {isLoading ? (
          'Loading...'
        ) : (
          <TracksList
            setSelectedTrack={handleTrackSelect}
            selectedTrack={selectedTrack}
            tracks={tracks}
          />
        )}
      </Sidebar>
    </main>
  );
};

export default MusicLibraryContainer;
