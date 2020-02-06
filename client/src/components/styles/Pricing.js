import styled from 'styled-components';

const PricingIcon = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
  display: inline-block;
  margin: auto;
  background-color: #007bff05;
  border-radius: 50%;

  &:after {
    content: '';
    position: absolute;
    width: 64px;
    height: 64px;
    line-height: 64px;
    background-color: #007bff0f;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    margin-top: -32px;
    margin-left: -32px;
  }
`;

const Amount = styled.div`
  font-size: 4.5rem;
  font-weight: 900;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .symbol {
    font-size: 1rem;
    vertical-align: super;
  }
`;

const Features = styled.ul`
  padding-left: 0;
  list-style: none;
  li {
    display: inline-block;
    margin: 0;
  }
  li:not(:last-child)::after {
    content: '•';
    -ms-flex-item-align: center;
    align-self: center;
    margin: 0 0.5rem;
    color: ${props => props.theme.primaryColor};
  }
`;

export { PricingIcon, Amount, Features };
