import React from "react";
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
export declare const TypingAnimator: React.FC<Props>;
export {};