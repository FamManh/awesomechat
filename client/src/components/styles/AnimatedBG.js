import styled from 'styled-components';

const AnimatedBG = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;

  span {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.04);
    animation: spin 50s linear infinite;
    bottom: -120px;
  }

  span:nth-child(1) {
    left: 10%;
    width: 60px;
    height: 60px;
    animation-delay: 50s;
  }

  span:nth-child(2) {
    left: 20%;
    width: 30px;
    height: 30px;
    animation-delay: 2s;
    animation-duration: 40s;
  }

  span:nth-child(3) {
    left: 30%;
    width: 40px;
    height: 40px;
    animation-delay: 30s;
  }

  span:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 20s;
  }

  span:nth-child(5) {
    left: 50%;
    width: 30px;
    height: 30px;
    animation-delay: 10s;
  }

  span:nth-child(6) {
    left: 60%;
    width: 100px;
    height: 100px;
    animation-delay: 0s;
  }

  span:nth-child(7) {
    left: 70%;
    width: 120px;
    height: 120px;
    animation-delay: 10s;
  }

  span:nth-child(8) {
    left: 80%;
    width: 30px;
    height: 30px;
    animation-delay: 20s;
    animation-duration: 40s;
  }

  span:nth-child(9) {
    left: 90%;
    width: 20px;
    height: 20px;
    animation-delay: 30s;
    animation-duration: 30s;
  }

  @keyframes spin {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
    }
  }
`;

export default AnimatedBG;
