import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@app/store';
import { Track } from '@models/Track';

import Player from '@components/Player/Player';
import TracksList from '../TracksList/TrackList';
import { fetchTracks } from '../../musicLibraryReducer';
import { Container, PlayerContainer, Sidebar, Title } from './MusicLibraryContainer.styles';

const MusicLibraryContainer = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(({ musicLibrary }) => musicLibrary.tracks);
  const isLoading = useAppSelector(({ musicLibrary }) => musicLibrary.isLoading);
  const isError = useAppSelector(({ musicLibrary }) => musicLibrary.isError);

  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  useEffect(() => {
    if (tracks.length) {
      setActiveTrack(tracks[0]);
    }
  }, [tracks]);

  const handleTrackSelect = (track: Track) => {
    setActiveTrack(track);
  };

  const toNextTrack = () => {
    const trackIdx = tracks.findIndex((track) => track.id === activeTrack!.id);
    setActiveTrack(tracks[trackIdx + 1] || tracks[0]);
  };

  const toPrevTrack = () => {
    const trackIdx = tracks.findIndex((track) => track.id === activeTrack!.id);
    setActiveTrack(tracks[trackIdx - 1] || tracks[tracks.length - 1]);
  };

  return (
    <Container>
      <Sidebar>
        <Title>Library</Title>
        {isError && <p>Failed to load tracks</p>}
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>...</div>
        ) : (
          <TracksList
            setSelectedTrack={handleTrackSelect}
            selectedTrack={activeTrack}
            tracks={tracks}
          />
        )}
      </Sidebar>
      <PlayerContainer>
        {activeTrack && (
          <Player
            key={activeTrack.id}
            track={activeTrack}
            onNextTrack={toNextTrack}
            onPrevTrack={toPrevTrack}
            onPlayToggle={() => setIsPlaying((prev) => !prev)}
            shouldPlayOnMount={isPlaying}
          />
        )}
      </PlayerContainer>
    </Container>
  );
};

export default MusicLibraryContainer;
