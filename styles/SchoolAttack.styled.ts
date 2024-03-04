import { keyframes } from 'styled-components';
import styled from 'styled-components';

export const SystemLayout = styled.div`
  width: 100vw;
  height: content-fit;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const MainLayout = styled.main<{ maxWidth: number }>`
  position: relative;
  display: flex;
  flex-direction: column;

  max-width: ${(props) => props.maxWidth}px;
  width: 100vw;
  min-height: 100vh;
`;

export const moveUpDown = keyframes`
  0%, 100% {
      transform: translateY(0);
  }
  50% {
      transform: translateY(-30px);
  }
`;

export const MoveUpDownWrapper = styled.div`
  animation: ${moveUpDown} 2s ease-in-out infinite;
`;
