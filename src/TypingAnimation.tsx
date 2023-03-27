import React, { useState, useEffect } from "react";
import "./index.css";
interface Props {
  /**
   * An array of text that you want to display
   */
  textArray: string[];
  /**
   * The color of the cursor
   */
  cursorColor?: string;
  /**
   * The color of the text
   */
  textColor?: string;
  /**
   * The font size of the text
   */
  fontSize?: string;
  /**
   * The typing speed. Should be an integer
   */
  typingSpeed?: number;
  /**
   * The delay speed in milliseconds
   */
  delaySpeed?: number;
}

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
    <div
      className="typing-container"
      style={{ fontSize: fontSize, color: textColor }}
    >
      {currentText}
      <span className="cursor" style={{ backgroundColor: cursorColor }}>
        |
      </span>
    </div>
  );
};
