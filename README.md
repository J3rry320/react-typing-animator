# React Typing Animator
------------

React Typing Animator is a React component for animating an array of texts like a typing sequence with blinking and a cursor. It can be used in both React and Next.js applications.

[![ezgif.com-optimize4ce54c113c3c4877.gif](https://i.postimg.cc/MH82FRdL/Screen-Recording-2024-09-02-at-5-18-35-PM.gif)](https://gifyu.com/image/SIYXV)

Installation
------------

You can install the package via npm or yarn:



```bash
npm install react-typing-animator

# or

yarn add react-typing-animator
```

Usage
-----

To use the component, import it into your project, provide an array of texts to the textArray prop, and customize the behavior and styles using other available props. Additionally, **don't forget to import the CSS file** for the component to work as intended.


```javascript
import React from 'react';
import TypingAnimator from 'react-typing-animator';
import 'react-typing-animator/styles.css';

function App() {
  const textArray = ['Welcome', 'to', 'the', 'React', 'Typing', 'Animator'];

  return (
    <TypingAnimator
      textArray={textArray}
      cursorColor="#333"
      textColor="#555"
      fontSize="24px"
      loop={false}
      typingSpeed={60}
      delaySpeed={1000}
      backspace
      height="60px"
      dynamicDelay
      displayCursor={false}
      style={{fontFamily: "Helvetica" , fontWeight: "bold", marginTop: "10px"}}
    />
  );
}

export default App;
```

Props
-----

The component accepts the following props:

| Prop Name | Type | Default Value | Description |
| --- | --- | --- | --- |
| `textArray` | string[] | `[]` | An array of texts to be animated.**This is required**|
| `loop` | boolean | true | If you need the animation to continue in a loop or stop after a single iteration.|
| `cursorColor` | string | `#000` | The color of the cursor. |
| `textColor` | string | `#000` | The color of the text. |
| `fontSize` | string | `16px` | The font size of the text. |
| `typingSpeed` | number | `200` | The speed at which the typing animation occurs, in milliseconds per character. |
| `delaySpeed` | number | `1500` | The delay between each text animation, in milliseconds. |
| `backspace` | boolean | `false` | Wether to enable the backspace behavior and animation. |
| `height` | string | `40px` |Height of the text container. |
| `dynamicDelay` | boolean | false | Adjust the delay based on the length of the current text. |
| `displayCursor` | boolean | true | Wether or not to display the cursor at the end. |
| `style` | CssProperties | {} | Add any custom style to the component.|

Features
-------

-   **Highly Customizable:** Adjust typing speed, colors, font sizes, and more.
-   **Looping Animations:** Choose whether the animation repeats indefinitely.
-   **Dynamic Delays:** Customize the delay based on text length for a natural typing effect.
-   **Backspace Support:** Enable backspace for realistic typing behavior.


Hire Me
-------

If you'd like to hire me for your project or learn more about my experience, please check out my [LinkedIn profile](https://www.linkedin.com/in/jerrythejsguy/)!

Contributing
------------
We welcome contributions! If you have ideas for new features or improvements, please open an [issue](https://github.com/J3rry320/react-typing-animator/issues) or submit a pull request.

License
-------

The React Typing Animator is released under the MIT License. See LICENSE.md for more information.