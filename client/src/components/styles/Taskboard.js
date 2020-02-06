import styled from 'styled-components';

const Wrapper = styled.div`
  width: 320px;
  padding-right: 0.5rem;
  padding-top: 1rem;
  padding-left: 0.5rem;
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  vertical-align: top;
`;

const Inner = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  white-space: normal;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border-radius: 0.25rem;
`;

export { Wrapper, Inner };
