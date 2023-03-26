declare module Typings {
  export interface Props {
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

  export interface TypingContainerProps {
    fontSize?: string;
    textColor?: string;
  }

  export interface CursorProps {
    cursorColor?: string;
  }
}
