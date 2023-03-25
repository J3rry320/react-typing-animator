import styled, { keyframes } from "styled-components";

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinking = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const typingCursor = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div`
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
`;

export const Text = styled.span`
  display: inline-block;
  animation: ${typing} 2s steps(30, end) infinite;
  animation-timing-function: steps(30, end);
  animation-fill-mode: forwards;
`;

export const Blink = styled.span`
  opacity: 0;
  animation: ${blinking} 0.8s infinite;
`;

export const Cursor = styled.span`
  display: inline-block;
  vertical-align: middle;
  background-color: #000;
  width: 1px;
  height: 1.3em;
  animation: ${typingCursor} 0.8s infinite;
`;
