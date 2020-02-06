import styled from 'styled-components';

const Timeline = styled.div`
  position: relative;
  &::before {
    position: absolute;
    top: 6px;
    width: 4px;
    height: 100%;
    content: '';
    background-color: #e6e6e6;
    left: 4px;
    @media (min-width: 576px) {
      left: 50%;
      margin-left: -2px;
    }
  }

  .icon {
    position: absolute;
    top: 6px;
    left: 0;
    width: 28px;
    height: 4px;
    border-radius: 4px;
    background-color: #e6e6e6;
    @media (min-width: 576px) {
      left: 50%;
      margin-left: -6px;
    }
  }
  .icon-even {
    margin-left: -26px;
    @media (max-width: 576px) {
      margin-left: 0;
    }
  }
  .icon-odd {
    margin-left: -2px;
    @media (max-width: 576px) {
      margin-left: 0;
    }
  }
  .content {
    position: relative;
    margin-left: 1rem;
    @media (min-width: 576px) {
      width: 47%;
      margin-left: 0;
    }
    @media (max-width: 576px) {
      margin-left: 30px;
    }
  }
  .content.right,
  .body.right {
    @media (min-width: 576px) {
      float: right;
    }
    @media (max-width: 576px) {
      float: left;
    }
  }
  .content.left,
  .content.left {
    @media (min-width: 576px) {
      float: left;
    }
    @media (max-width: 576px) {
      float: left;
    }
  }
  .body {
    float: left;
    margin: 0;
    @media (max-width: 576px) {
      float: left;
      margin-bottom: 0;
    }
  }

  .date {
    display: inline-block;
    width: 47%;
    @media (min-width: 576px) {
      position: absolute;
      top: 0;
    }
    @media (max-width: 576px) {
      position: relative;
      top: 0;
      width: 100%;
      left: 30px;
    }
  }
  .date-even {
    @media (min-width: 576px) {
      padding-left: 42px;
      left: 50%;
    }
  }
  .date-odd {
    @media (min-width: 576px) {
      padding-right: 42px;
      text-align: right;
      right: 50%;
    }
  }
`;

export default Timeline;
