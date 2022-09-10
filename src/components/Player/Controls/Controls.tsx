import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ControlsContainer, Icon, IconArrow } from './Controls.style';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: (state: boolean) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Controls = ({ isPlaying, onTogglePlay, onPrevClick, onNextClick }: ControlsProps) => (
  <ControlsContainer>
    <IconArrow>
      <FontAwesomeIcon
        role="button"
        icon={faChevronLeft}
        onClick={onPrevClick}
        aria-label="Previous"
      />
    </IconArrow>
    <Icon>
      <FontAwesomeIcon
        role="button"
        icon={isPlaying ? faPause : faPlay}
        onClick={() => onTogglePlay(!isPlaying)}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      />
    </Icon>
    <IconArrow>
      <FontAwesomeIcon
        role="button"
        icon={faChevronRight}
        onClick={onNextClick}
        aria-label="Next"
      />
    </IconArrow>
  </ControlsContainer>
);

export default Controls;
