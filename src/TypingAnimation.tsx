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

interface TypingContainerProps {
  fontSize?: string;
  textColor?: string;
}

interface CursorProps {
  cursorColor?: string;
}

const blink = `
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

class TypingAnimator extends React.Component<Props> {
  private interval: number | undefined;
  private currentText: string = "";
  private currentWordIndex: number = 0;
  private forward: boolean = true;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      if (this.forward) {
        if (this.currentText === this.props.textArray[this.currentWordIndex]) {
          this.forward = false;
          setTimeout(() => {
            this.currentWordIndex =
              (this.currentWordIndex + 1) % this.props.textArray.length;
            this.forward = true;
          }, this.props.delaySpeed || 1500);
        } else {
          this.currentText = this.props.textArray[this.currentWordIndex].slice(
            0,
            this.currentText.length + 1
          );
        }
      } else {
        if (this.currentText === "") {
          this.forward = true;
        } else {
          this.currentText = this.currentText.slice(
            0,
            this.currentText.length - 1
          );
        }
      }
      this.forceUpdate();
    }, this.props.typingSpeed || 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          fontSize: this.props.fontSize || "1rem",
          color: this.props.textColor || "black",
          position: "relative",
        }}
      >
        {this.currentText}
        <span
          style={{
            display: "inline-block",
            width: "0.3rem",
            height: "1rem",
            marginLeft: "0.1rem",
            backgroundColor: this.props.cursorColor || "black",
            position: "absolute",
            animation: "blink 1s infinite",
          }}
        />
        <style>{blink}</style>
      </div>
    );
  }
}

export default TypingAnimator;
