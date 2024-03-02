import { keyframes } from '@emotion/react';
import emotionStyled from '@emotion/styled';

export const SystemLayout = emotionStyled.div`
  width: 100vw;
  height: content-fit;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const MainLayout = emotionStyled.main<{ maxWidth: number }>`
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
