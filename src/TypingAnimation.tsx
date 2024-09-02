import React, { useState, useEffect, useRef } from "react";
import "./index.css";

interface Props {
  textArray: string[];
  cursorColor?: string;
  textColor?: string;
  fontSize?: string;
  typingSpeed?: number;
  delaySpeed?: number;
  backspace?: boolean;
  height?: string;
  loop: boolean;
  dynamicDelay?: boolean;
}
/**
 * Props for the React Typing Animator component.
 * @typedef {Object} Props
 * @property {string[]} textArray - Array of strings to animate.
 * @property {string} [cursorColor="black"] - The color of the cursor.
 * @property {string} [textColor="black"] - The color of the text.
 * @property {string} [fontSize="1rem"] - The font size of the text.
 * @property {number} [typingSpeed=200] - The speed of typing in milliseconds per character.
 * @property {number} [delaySpeed=1500] - The delay between text animations in milliseconds.
 * @property {boolean} [backspace=false] - Whether to use backspace animation or not.
 * @property {string} [height="40px"] - The height of the text container.
 * @property {boolean} loop - If true, the animation will loop indefinitely.
 * @property {boolean} [dynamicDelay=false] - Adjust the delay based on the length of the current text.
 */

/**
 * React Typing Animator is a React component that animates an array of texts in a typing sequence with a blinking cursor.
 *
 * @param {Props} props - Props for React Typing Animator component.
 * @returns {JSX.Element} The animated text component with a cursor.
 *
 * @example
 * <TypingAnimator
 *   textArray={["Hello", "World"]}
 *   cursorColor="#FF0000"
 *   textColor="#000000"
 *   fontSize="2rem"
 *   typingSpeed={100}
 *   delaySpeed={2000}
 *   backspace={true}
 *   height="50px"
 *   loop={true}
 *   dynamicDelay={true}
 * />
 */
const TypingAnimator = ({
  textArray,
  cursorColor = "black",
  textColor = "black",
  fontSize = "1rem",
  typingSpeed = 200,
  delaySpeed = 1500,
  backspace = false,
  height = "40px",
  loop,
  dynamicDelay = false,
}: Props) => {
  const [currentText, setCurrentText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [delay, setDelay] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle typing and backspacing
  useEffect(() => {
    if (delay) return;

    const handleTyping = () => {
      if (forward) {
        if (currentText === textArray[currentWordIndex]) {
          setDelay(true);
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
    };

    intervalRef.current = setInterval(handleTyping, typingSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentText, forward, typingSpeed]);

  // Handle delays and word transitions
  useEffect(() => {
    if (!delay) return;

    const handleDelay = () => {
      setTimeout(
        () => {
          setCurrentWordIndex((currentWordIndex + 1) % textArray.length);
          setForward(backspace ? false : true);
          setCurrentText(backspace ? currentText : "");
          setDelay(false);
        },
        dynamicDelay ? delaySpeed + currentText.length * 50 : delaySpeed
      );
    };

    handleDelay();
  }, [
    delay,
    currentWordIndex,
    backspace,
    textArray.length,
    delaySpeed,
    dynamicDelay,
  ]);

  // Stop the animation if loop is false and the last word is reached
  useEffect(() => {
    if (!loop && currentWordIndex === textArray.length - 1 && !forward) {
      clearInterval(intervalRef.current!);
    }
  }, [currentWordIndex, loop, forward, textArray.length]);

  return (
    <div
      className="typing-container"
      style={{
        fontSize,
        color: textColor,
        height,
      }}
    >
      {currentText}
      <span
        className="cursor"
        style={{
          backgroundColor: cursorColor,
        }}
      >
        |
      </span>
    </div>
  );
};

export default TypingAnimator;
