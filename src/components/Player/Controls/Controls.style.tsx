import styled from 'styled-components';

export const ControlsContainer = styled.div`
  width: 50%;
  margin: 40px auto 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Icon = styled.i`
  font-size: 50px;
  cursor: pointer;

  &:hover {
    color: #444;
  }
`;

export const IconArrow = styled(Icon)`
  font-size: 30px;
`;
