import React, { useState, useEffect } from "react";
import { Container, Text, Blink, Cursor } from "./style";

interface Props {
  textArray: string[];
  cursorColor?: string;
  textColor?: string;
  fontSize?: string;
  typingSpeed?: number;
  delaySpeed?: number;
}

export const TypingAnimator: React.FC<Props> = ({
  textArray,
  cursorColor = "#000",
  textColor = "#000",
  fontSize = "1em",
  typingSpeed = 200,
  delaySpeed = 1500,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = textArray[currentWordIndex];
    let currentWordIndexCopy = currentWordIndex;

    const intervalId = setInterval(() => {
      setCurrentText((prevText) => {
        if (prevText === currentWord) {
          clearInterval(intervalId);
          setTimeout(() => {
            setCurrentWordIndex((prevIndex) =>
              prevIndex === textArray.length - 1 ? 0 : prevIndex + 1
            );
          }, delaySpeed);
        } else {
          return currentWord.slice(0, prevText.length + 1);
        }
        return prevText;
      });
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [currentText, currentWordIndex, delaySpeed, textArray, typingSpeed]);

  return (
    <Container>
      <Text style={{ color: textColor, fontSize: fontSize }}>
        {currentText}
        <Blink style={{ backgroundColor: cursorColor }} />
      </Text>
      <Cursor style={{ backgroundColor: cursorColor }} />
    </Container>
  );
};
