import styled from 'styled-components';

export const PlayerContainer = styled.div`
  text-align: center;
  width: 100%;
`;

export const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  margin: auto;

  input {
    margin: 0 20px;
    width: 100%;
  }
`;

export const Image = styled.img`
  max-width: 400px;
  border-radius: 30%;
`;

export const ArtistName = styled.div`
  margin-top: 40px;
  font-size: 20px;
`;

export const TrackName = styled.h2`
  margin-top: 40px;
  margin-bottom: 50px;
  font-size: 32px;
`;
