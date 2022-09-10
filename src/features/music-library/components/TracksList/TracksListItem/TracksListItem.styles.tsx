import styled from 'styled-components';
import { TracksListItemProps } from './TracksListItem';

export const ListItem = styled.li<Pick<TracksListItemProps, 'isSelected'>>`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 15px 25px 15px 25px;
  cursor: pointer;
  transition: 0.2s;
  background: ${({ isSelected }) => (isSelected ? 'rgb(148, 189, 247)' : '')};

  &:hover {
    background: ${({ isSelected }) => (isSelected ? 'rgb(148, 189, 247)' : 'rgb(214, 228, 248)')};
  }

  img {
    width: 70px;
    height: 70px;
    margin-right: 20px;
    padding: 0;
  }
`;

export const TrackName = styled.div`
  font-weight: 600;
`;

export const ArtistName = styled.div`
  font-size: 13px;
`;
