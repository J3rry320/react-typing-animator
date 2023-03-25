import React, { useState, useEffect } from "react";
import "./index.module.css";

export interface TypingAnimatorProps {
  /**
   * An array of strings to animate
   */
  textArray: string[];

  delay?: number;
  /**
   * Amount of time in milliseconds to wait before the typing animation
   */
  typingDelay?: number;
  /**
   * Amount of time by which the blinking animation should be delayed
   */
  blinkDelay?: number;
}

export const TypingAnimator: React.FC<TypingAnimatorProps> = ({
  textArray,
  delay = 1000,
  typingDelay = 100,
  blinkDelay = 500,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor((prev) => !prev);

      if (showCursor) {
        setCurrentWordIndex((prev) => prev + 1);

        if (currentWordIndex === textArray[currentTextIndex].length) {
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentWordIndex(0);
        }
      }
    }, blinkDelay);

    return () => clearInterval(intervalId);
  }, [blinkDelay, currentTextIndex, currentWordIndex, showCursor, textArray]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord((prev) => {
        const word = textArray[currentTextIndex];

        if (currentWordIndex === word.length) {
          return prev;
        }

        const newWord = word.slice(0, currentWordIndex + 1);

        if (prev === newWord) {
          setCurrentWordIndex((prev) => prev + 1);
        } else {
          setCurrentWord(newWord);
        }

        return newWord;
      });
    }, typingDelay);

    return () => clearInterval(intervalId);
  }, [currentTextIndex, currentWordIndex, textArray, typingDelay]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowCursor(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return (
    <div className="TypingAnimator">
      <div className="TypingAnimator-word">{currentWord}</div>
      {showCursor && <div className="TypingAnimator-cursor">|</div>}
    </div>
  );
};
