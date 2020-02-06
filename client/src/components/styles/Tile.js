import styled from 'styled-components';

const Figure = styled.figure`
  position: relative;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background: ${props => props.theme.darkColor};
  text-align: left;
  margin-bottom: 1px;
  height: ${props => props.height}px;
  > img {
    position: relative;
    display: block;
    max-width: 100%;
    opacity: 0.8;
    transition: opacity 300ms, transform 300ms;
    opacity: 0.85;
    height: 300px;
    margin: auto;
    object-fit: cover;
  }
  &:hover > img {
    opacity: 0.6;
  }
`;

const Caption = styled.figcaption`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 1rem;
  position: absolute;
  left: 0;
  right: 0;
  &.footer {
    bottom: 0;
  }

  &.header {
    top: 0;
  }
`;

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
  font-weight: 700;
`;

const SubTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
`;

const Image = styled.span`
  position: absolute;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.source});
  width: 100%;
  height: 100%;
`;

export { Figure, Caption, Title, SubTitle, Image };
