import React, { useState, useEffect, useRef, CSSProperties } from "react";
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
  loop?: boolean;
  dynamicDelay?: boolean;
  displayCursor?: boolean;
  style?: CSSProperties;
}

/**
 * React Typing Animator is a React component that animates an array of texts in a typing sequence with a blinking cursor.
 *
 * @param {Props} props - Props for React Typing Animator component.
 * @param {string[]} props.textArray - Required Array of strings to be animated in the typing sequence.
 * @param {string} [props.cursorColor="black"] - Color of the blinking cursor.
 * @param {string} [props.textColor="black"] - Color of the animated text.
 * @param {string} [props.fontSize="1rem"] - Font size of the animated text.
 * @param {number} [props.typingSpeed=200] - Speed of typing in milliseconds.
 * @param {number} [props.delaySpeed=1500] - Delay between typing each word in milliseconds.
 * @param {boolean} [props.backspace=false] - Whether to backspace the text after typing it.
 * @param {string} [props.height="40px"] - Height of the container for the animated text.
 * @param {boolean} [props.loop=true] - Whether to loop the animation after completing the text array.
 * @param {boolean} [props.dynamicDelay=false] - Whether to add a dynamic delay based on the length of the text.
 * @param {boolean} [props.displayCursor=true] - Whether to display the blinking cursor.
 * @param {CSSProperties} [props.style={}] - Additional CSS styles for the container.
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
 *   displayCursor={true}
 *   style={{ margin: "20px", textAlign: "center" }}
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
  loop = true,
  dynamicDelay = false,
  displayCursor = true,
  style = {},
}: Props) => {
  const [currentText, setCurrentText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [delay, setDelay] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle typing and backspacing
  useEffect(() => {
    if (delay || isComplete) return;

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
  }, [
    currentText,
    forward,
    typingSpeed,
    delay,
    isComplete,
    currentWordIndex,
    textArray,
  ]);

  // Handle delays and word transitions
  useEffect(() => {
    if (!delay) return;

    const timeout = setTimeout(
      () => {
        const isLastWord = currentWordIndex === textArray.length - 1;

        if (!loop && isLastWord) {
          if (!backspace || (backspace && !forward)) {
            setIsComplete(true);
            return;
          }
        }

        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        setForward(backspace ? false : true);
        setCurrentText(backspace ? currentText : "");
        setDelay(false);
      },
      dynamicDelay ? delaySpeed + currentText.length * 50 : delaySpeed
    );

    return () => clearTimeout(timeout);
  }, [
    delay,
    currentWordIndex,
    backspace,
    textArray.length,
    delaySpeed,
    dynamicDelay,
    currentText,
    loop,
    forward,
  ]);

  return (
    <div
      className="typing-container"
      style={{
        fontSize,
        color: textColor,
        height,
        lineHeight: height,
        ...style,
      }}
    >
      <span>{currentText}</span>
      {displayCursor && !isComplete && (
        <span
          className="cursor"
          style={{
            backgroundColor: cursorColor,
            height: `calc(${fontSize} * 1.2)`,
            top: `calc((${height} - ${fontSize} * 1.2) /2)`,
          }}
        />
      )}
    </div>
  );
};

export default TypingAnimator;