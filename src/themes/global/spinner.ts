import { css } from 'styled-components';

export default css`
  .spinner {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background: rgba(255, 255, 255, 0.75);
      opacity: 0;
      pointer-events: none;
      transition: opacity 1s;
      z-index: 100;
    }

    &:after {
      content: '';
      border-radius: 50%;
      border: 4px solid transparent;
      border-top-color: #4acaa8;
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 8rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.8s;
      animation: spin 0.8s cubic-bezier(0.46, 0.03, 0.52, 0.96) infinite;
      z-index: 150;
    }

    &.spinning:before {
      opacity: 1;
      pointer-events: all;
    }
  
    &.spinning:after {
      opacity: 1;
      //https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_transition-delay
      // maybe a 1s delay so CloudFront cache loads don't even show the spinner
      // transition-delay: 15s;
    }
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`