import { useState, useEffect, useRef, memo } from 'react';

import { Track } from '@models/Track';
import AudioControls from './Controls/Controls';
import { ArtistName, Image, PlayerContainer, RangeContainer, TrackName } from './Player.style';

const formatTime = (rawSeconds: number) => {
  const seconds = Number(rawSeconds.toFixed(0));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter((a) => a).join(':');
};

export interface PlayerProps {
  track: Track;
  shouldPlayOnMount: boolean;
  onPlayToggle: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

const Player = ({
  track,
  shouldPlayOnMount,
  onPlayToggle,
  onNextTrack,
  onPrevTrack,
}: PlayerProps) => {
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [audioLength, setAudioLength] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(shouldPlayOnMount);

  const audioRef = useRef(new Audio(track.audio));
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { duration } = audioRef.current;

  const startProgress = () => {
    clearInterval(intervalRef.current);

    intervalRef!.current = setInterval(() => {
      if (audioRef.current.ended) {
        onNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    const listener = () => setAudioLength(audioRef.current.duration);
    audioRef.current.addEventListener('loadedmetadata', listener);

    return () => {
      audioRef.current.removeEventListener('loadedmetadata', listener);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startProgress();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const onScrub = (value: string) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = Number(value);
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (isPlaying) {
      startProgress();
    }
  };

  const handleTogglePlay = (state: boolean) => {
    setIsPlaying(state);
    onPlayToggle();
  };

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <PlayerContainer>
      <div>
        <Image src={track.cover} alt={`track artwork for ${track.name} by ${track.artist}`} />
        <ArtistName>{track.artist}</ArtistName>
        <TrackName>{track.name}</TrackName>
        <RangeContainer>
          <span>{formatTime(trackProgress)}</span>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            onChange={(ev) => onScrub(ev.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
          <span style={{ minWidth: 30 }}>{!!audioLength && formatTime(audioLength)}</span>
        </RangeContainer>
        <AudioControls
          isPlaying={isPlaying}
          onNextClick={onNextTrack}
          onPrevClick={onPrevTrack}
          onTogglePlay={handleTogglePlay}
        />
      </div>
    </PlayerContainer>
  );
};

export default memo(Player);
