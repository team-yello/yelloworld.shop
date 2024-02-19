import emotionStyled from '@emotion/styled';

export const SystemLayout = emotionStyled.div`
  width: 100vw;
  height: content-fit;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const MainLayout = emotionStyled.main<{ maxWidth: number }>`
  display: flex;
  flex-direction: column;
  
  max-width: ${(props) => props.maxWidth}px;
  width: 100vw;
`;
