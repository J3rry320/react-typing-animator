# React Typing Animator
=====================

React Typing Animator is a React component for animating an array of texts like a typing sequence with blinking and a cursor. It can be used in both React and Next.js applications.

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

To use the component, you need to import it and pass an array of texts to the `textArray` prop. You can also customize the cursor color, text color, font size, typing speed, and delay speed.


```javascript
import React from 'react';
import TypingAnimator from 'react-typing-animator';

function App() {
  const textArray = ['Welcome', 'to', 'the', 'React', 'Typing', 'Animator'];

  return (
    <TypingAnimator
      textArray={textArray}
      cursorColor="#333"
      textColor="#555"
      fontSize="24px"
      typingSpeed={60}
      delaySpeed={1000}
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
| `textArray` | string[] | `[]` | An array of texts to be animated. |
| `cursorColor` | string | `#000` | The color of the cursor. |
| `textColor` | string | `#000` | The color of the text. |
| `fontSize` | string | `16px` | The font size of the text. |
| `typingSpeed` | number | `50` | The speed at which the typing animation occurs, in milliseconds per character. |
| `delaySpeed` | number | `1000` | The delay between each text animation, in milliseconds. |

Hire Me
-------

If you'd like to hire me for your project or learn more about my experience, please check out my [LinkedIn profile](https://www.linkedin.com/in/jerrythejsguy/)!

License
-------

The React Typing Animator is released under the MIT License. See LICENSE.md for more information.