import React, { useState, useEffect } from "react";
import "./index.css";

type TypingAnimationProps = {
  textArray: string[];
  intervalTime?: number;
  className?: string;
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  textArray,
  intervalTime = 200,
  className = "",
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [cursorBlink, setCursorBlink] = useState<boolean>(false);

  useEffect(() => {
    let interval;
    if (currentWordIndex < textArray.length) {
      const word: string = textArray[currentWordIndex];
      interval = setInterval(() => {
        setCurrentWord((prevWord: string) => {
          if (prevWord === word) {
            clearInterval(interval);
            setCurrentWordIndex((prevIndex: number) =>
              prevIndex === textArray.length - 1 ? 0 : prevIndex + 1
            );
            return "";
          }
          return prevWord + word.charAt(prevWord.length);
        });
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [currentWordIndex, intervalTime, textArray]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorBlink((prevBlink: boolean) => !prevBlink);
    }, 1000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className={`typing-animation-container ${className}`}>
      <div className="typing-animation">
        {currentWord}
        <span className={`typing-cursor ${cursorBlink ? "blink" : ""}`}>|</span>
      </div>
    </div>
  );
};

export default TypingAnimation;
