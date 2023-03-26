import React, { useState, useEffect } from "react";
import { Props, TypingContainerProps, CursorProps } from "react-text-animator";
import styled from "styled-components";

const TypingContainer = styled.div<TypingContainerProps>`
  display: inline-block;
  font-size: ${(props) => props.fontSize || "1rem"};
  color: ${(props) => props.textColor || "black"};
`;

const Cursor = styled.span<CursorProps>`
  display: inline-block;
  width: 0.3rem;
  height: 1rem;
  margin-left: 0.1rem;
  background-color: ${(props) => props.cursorColor || "black"};
  animation: blink 1s infinite;
`;

const blink = `
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

export const TypingAnimator: React.FC<Props> = ({
  textArray,
  cursorColor,
  textColor,
  fontSize,
  typingSpeed,
  delaySpeed,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forward) {
        if (currentText === textArray[currentWordIndex]) {
          setForward(false);
          setTimeout(() => {
            setCurrentWordIndex((currentWordIndex + 1) % textArray.length);
            setForward(true);
          }, delaySpeed || 1500);
        } else {
          setCurrentText(
            textArray[currentWordIndex].slice(0, currentText.length + 1)
          );
        }
      } else {
        if (currentText === "") {
          setForward(true);
        } else {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }
      }
    }, typingSpeed || 200);
    return () => clearInterval(interval);
  }, [currentText, forward, currentWordIndex]);

  return (
    <TypingContainer fontSize={fontSize} textColor={textColor}>
      {currentText}
      <Cursor cursorColor={cursorColor} />
      <style>{blink}</style>
    </TypingContainer>
  );
};
