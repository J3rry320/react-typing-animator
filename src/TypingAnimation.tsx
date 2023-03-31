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
  /**
   * Enable/disable backspace behavior
   */
  backspace?: boolean;
}

const TypingAnimator = (props: Props) => {
  // ... useState and useEffect here ...
  const [currentText, setCurrentText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      if (props.backspace && !forward) {
        if (currentText === "") {
          setForward(true);
        } else {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }
      } else {
        if (currentText === props.textArray[currentWordIndex]) {
          setForward(false);
          setTimeout(() => {
            setCurrentWordIndex(
              (currentWordIndex + 1) % props.textArray.length
            );
            setForward(true);
          }, props.delaySpeed || 1500);
        } else {
          setCurrentText(
            props.textArray[currentWordIndex].slice(0, currentText.length + 1)
          );
        }
      }
    }, props.typingSpeed || 200);

    return () => {
      clearInterval(interval);
    };
  }, [currentText, currentWordIndex, forward, props]);

  return (
    <div
      className="typing-container"
      style={{
        fontSize: props.fontSize || "1rem",
        color: props.textColor || "black",
      }}
    >
      {currentText}
      <span
        className="cursor"
        style={{
          backgroundColor: props.cursorColor || "black",
        }}
      />
    </div>
  );
};

export default TypingAnimator;
